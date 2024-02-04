"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../firebase.config'
import { signOut } from 'firebase/auth';
import { getDailyHorosCopes } from '@/lib/action';


const AuthContext = createContext();
const storedUserSession = null

export const AuthProvider = ({ children }) => {

  useEffect(() => {
    var storedUserSession =  sessionStorage.getItem('user');
  }, [storedUserSession]);
  
  const [user] = useAuthState(auth);
  const [userSession, setUserSession] = useState(storedUserSession);
  const [sign, setSign] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = async () => {
    // console.log('yyyy', data)
    // console.log('xxxxx', data.user.auth.currentUser) // 1993-02-17
    sessionStorage.setItem('user', JSON.stringify(user))
  };

  const clearUserSession = () => {
    setUserSession(null);
    signOut(auth)
    sessionStorage.removeItem('user')
  };

  const handleSignChange = async (sign) => {
    try {
      setIsLoading(true);
      const res = await getDailyHorosCopes(sign);
      // console.log('xx', res);
      setSign([res])
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ userSession, setUser, clearUserSession, sign, handleSignChange, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  try {
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    // console.log(context)
    return context;
  } catch (error) {
    console.log(error);
    throw error;
  }
};