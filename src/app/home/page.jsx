
"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext';
import NavbarComponent from '@/components/NavbarComponent/NavbarComponent';
import FourZeroFourComponent from '@/components/404/FourZeroFourComponent';
import {getDailyHorosCopes} from '@/lib/action';
import Image from 'next/image';

const Home = () => {

    const { userSession } = useAuth();
    const [dailyHoroscope, setDailyHoroscope] = useState([]);

    console.log(userSession)

    if(!userSession) {
        // router.push('/login', { scroll: false })
        return (
            <FourZeroFourComponent />
        )
    }

    useEffect(() => {
        const fetchData = async () => {
          if (userSession) {
            try {
              const res = await getDailyHorosCopes(userSession.sign);
              console.log('xx', res);
              setDailyHoroscope(res);
            } catch (error) {
              console.error('Error fetching daily horoscopes:', error);
            }
          }
        };
    
        fetchData();
    
      }, [userSession]);

    return (
        <>
            <NavbarComponent />
            <section className="bg-white">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7 px-5">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Welcome {userSession?.name}
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        Today is: {dailyHoroscope?.horoscope}
                    </p>
                    <div>
                    <button
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                        {dailyHoroscope?.sign}
                        
                    </button>
                    </div>
                    
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex px-5">
                        <Image src={dailyHoroscope?.icon} alt="daily horoscope" width="300" height="200" />
                    </div>
                </div>
            </section>
        </>
        
    )
}

export default Home