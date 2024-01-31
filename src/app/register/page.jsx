"use client"

import Link from 'next/link'
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerSchema } from './validationSchemas';
import { addUser } from "@/lib/action";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import AlertComponent from '@/components/AlertComponent/AlertComponent';
import { toast } from 'react-toastify';
import SpinnerComponent from '@/components/SpinnerComponent/SpinnerComponent';

const Register = () => {

    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          confirm_password: '',
          dob: ''
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            const { name, email, password, dob } = values;
            try {
              const response = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/api/auth/callback`
                }
              })
              if(response.data?.user) {
                console.log(response.data.user.id);
                const { id } = response.data.user;
                const updatedValues = { ...values, id };
                try {
                  const res = await addUser(updatedValues);
                  console.log('Response from addUser:', res);
                  if (res.error) {
                    setErrorMsg(res.error);
                    return;
                  }
                  
                } catch (error) {
                  console.error('Error during registration:', error);
                }
                toast.success('Registration successful! Please check your email to verify your account.');
                router.push("/login");
              }
            } catch (error) {
              setErrorMsg(error);
            }
            
          },
    });

  return (
    <section className="items-center justify-center flex flex-wrap mt-10">
      <div className="w-[600px] bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Back 
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 pl-1">
                To Login
              </Link>
            </p>
            {errorMsg && (
                <AlertComponent message={errorMsg} alertType="error" />
            )}
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                        name="name"
                        type="text"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500">{formik.errors.name}</div>
                    )}
                </div>
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                        name="dob"
                        type="date"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                        <div className="text-red-500">{formik.errors.dob}</div>
                    )}
                </div>
                </div>
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
                        placeholder="Enter your email or username"
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
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && (
                        <div className="text-red-500">{formik.errors.confirm_password}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  </div>
                  <div className="text-sm">
                    
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
                        'Register'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Register