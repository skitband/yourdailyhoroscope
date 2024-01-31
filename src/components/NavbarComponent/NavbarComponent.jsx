
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../app/AuthContext';
import { logoutUser } from '@/lib/action';
import { useRouter } from 'next/navigation';

const NavbarComponent = () => {

    const { userSession, clearUserSession } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if(res.error) {
                console.log(res.error);
                toast.error(res.error.message);
                return;
            }
            clearUserSession();
            router.push('/login', { scroll: false })
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {userSession? (
                    <>
                        <Link href="#" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 text-center">
                            Login
                        </Link>
                        <Link href="/register" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                            Signup
                        </Link>
                    </>
                )}
                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h15M1 7h15M1 13h15"
                    />
                    </svg>
                </button>
                </div>
                <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
                >
                </div>
            </div>
        </nav>

    )
}

export default NavbarComponent