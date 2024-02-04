"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useFormik } from 'formik';
import { loginSchema } from './loginSchema';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase.config'
import { useAuth } from '../AuthContext';
import SpinnerComponent from '@/components/SpinnerComponent/SpinnerComponent';

const Login = () => {
  
  const router = useRouter()
  const { setUser } = useAuth()
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleSignInLoading, googleSignInError] = useSignInWithGoogle(auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const res = await signInWithEmailAndPassword(email, password);
        if(!user){
          console.log(error)
          toast.error(error.message)
          return
        }
        setUser(res.user)
        router.push('/home')
      }catch(e){
        console.error(e)
        throw e 
      }
    },
  });

  if(googleUser){
    console.log(googleUser)
    setUser(googleUser)
    router.push('/home')
  }

  return (
    <>
    <section className="items-center justify-center flex flex-wrap mt-10">
      <div className="w-[600px] bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or 
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 pl-1">
                Create an account
              </Link>
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      name="email"
                      type="email"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="text-red-500">{formik.errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {formik.isSubmitting? (
                        <SpinnerComponent />
                    ) : (
                        'Sign In'
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-100 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Image
                        width={10}
                        height={10}
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Image
                        width={10}
                        height={10}
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/512317/github-142.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div>
                    <button
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => signInWithGoogle()}
                    >
                      <Image
                        width={10}
                        height={10}
                        className="h-5 w-5"
                        src="https://www.svgrepo.com/show/506498/google.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
    </>
    
  )
}

export default Login