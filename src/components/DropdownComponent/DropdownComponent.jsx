"use client"

import { useState } from 'react';
import { useAuth } from '@/app/AuthContext';

const DropdownComponent = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const horoscopes = ['Aries', 'Aquarius', 'Pisces', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

  const { sign, handleSignChange  } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <button onClick={toggleDropdown} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mt-5" type="button">
        What is your Horoscope
        <svg
          className={`w-2.5 h-2.5 ms-3 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div className={`${ isDropdownOpen ? 'block' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2`}
      >
        <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
        {horoscopes.map((horoscope, index) => (
            <li key={index}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  handleSignChange(horoscope);
                  setDropdownOpen(false);
                }}
              >
                {horoscope}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownComponent;
