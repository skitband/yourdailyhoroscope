import React from 'react'
import Link from 'next/link'

const FourZeroFourComponent = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home
            page.{" "}
          </p>
          <Link
            href="/login"
            className="inline-flex text-blue-700 font-medium text-sm px-5 py-2.5 text-center"
          >
            Please Login to continue
          </Link>
        </div>
      </div>
    </section>

  )
}

export default FourZeroFourComponent