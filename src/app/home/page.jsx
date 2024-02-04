
"use client"

import NavbarComponent from '@/components/NavbarComponent/NavbarComponent';
import FourZeroFourComponent from '@/components/404/FourZeroFourComponent';
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase.config'
import { useAuth } from '../AuthContext';
import Image from 'next/image';
import SpinnerComponent from '@/components/SpinnerComponent/SpinnerComponent';
import HomeSkelComponent from '@/components/HomeSkelComponent/HomeSkelComponent';
import DropdownComponent from '@/components/DropdownComponent/DropdownComponent';

const Home = () => {

    const [ user ] = useAuthState(auth);
    const { userSession, sign, isLoading } = useAuth()

    if (!user && !userSession){
        return <FourZeroFourComponent />
    }

    return (
        <>
            <NavbarComponent />
            <section className="bg-white">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                {isLoading? (
                        <HomeSkelComponent />
                    ) : (
                        <>
                        <div className="mr-auto place-self-center lg:col-span-7 px-5">
                        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                            Welcome {user?.displayName}
                        </h1>
                        <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        <ul>
                            {sign?.map((signItem) => (
                            <li key={signItem.id}>
                                <p className="text-2xl mb-2">Sign: {signItem.sign}</p>
                                <p className='text-2xl mb-4'>Date: {signItem.date}</p>
                                <p className='text-justify'>Horoscope: {signItem.horoscope}</p>
                            </li>
                            ))}
                        </ul>
                        </div>
                    <div>
                    <DropdownComponent />
                    </div>
                    
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex px-5">
                        {isLoading? (
                            <SpinnerComponent color="blue" />
                        ) : (
                            <div className="relative object-container w-1/2 h-1/2 m-auto">
                            {sign?.map((signItem) => (
                                <Image
                                    key={signItem.id}
                                    // src={signItem?.icon}
                                    src={`/images/${signItem?.sign}.png`}
                                    fill="true"
                                    className="rounded-lg"
                                    alt="horoscope icon"
                                    onLoad={(e) => console.log(e)}
                                />
                            ))}
                            </div>
                        )}
                    </div>
                    </>
                )}
                </div>
            </section>
        </>
        
    )
}

export default Home