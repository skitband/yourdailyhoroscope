"use client"

import React, { createContext, useContext, useState, useEffect  } from 'react';
import { getHoroscopeSign } from '../lib/action';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const isBrowser = typeof window !== 'undefined';

  const storedUserSession = isBrowser && localStorage.getItem('userSession') ? JSON.parse(localStorage.getItem('userSession')) : null;
  const [userSession, setUserSession] = useState(storedUserSession || null);

  // console.log(userSession, storedUserSession);
  
  useEffect(() => {
    if (storedUserSession) {
      setUserSession(storedUserSession);
    }
    
  }, []);

  const setUser = async (data) => {
    //console.log(data.dob) // 1993-02-17

    const sign = await getHoroscopeSign(data.dob);

    setUserSession((prevSession) => {
      const newSession = {
        ...prevSession,
        ...data,
        sign: sign,
      };
  
      if (isBrowser) {
        localStorage.setItem('userSession', JSON.stringify(newSession));
      }
  
      return newSession;
    });
  };

  const clearUserSession = () => {
    if (isBrowser) {
      localStorage.removeItem('userSession');
    }
    setUserSession(null);
  };

  return (
    <AuthContext.Provider value={{ userSession, setUser, clearUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  try {
    if(!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    // console.log(context)
    return context;
  } catch (error) {
    console.log(error)
    throw error
  }
};
