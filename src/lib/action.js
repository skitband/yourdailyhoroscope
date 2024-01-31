"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const supabase = createClient(
    "https://xmlfiqbdjltqahtgvsyk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbGZpcWJkamx0cWFodGd2c3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjAwMjksImV4cCI6MjAyMTM5NjAyOX0.3ivGZP8YJGZ7_PIWynhHRah3w-v8XuCwe2txB6cG2h0"
);

const getUserById = async (uid) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error) {
      throw error;
    }

    return { data };
  } catch (error) {
    return { error: error.message || 'An error occurred while fetching user details.' };
  }
};

export const addUser = async (formData) => {
    const { name, email, password, id, dob } = formData;
    console.log('formdata', formData);
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);
  
      if (existingUser.length > 0) {
        console.error('Email already registered');
        return { error: 'Email already registered', alertType: 'error' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const { data, error } = await supabase
      .from('users')
      .insert([
        { name: name, email: email, password: hashedPassword, dob: dob, uid: id },
      ])
      .select()
  
      if (error) {
        console.error('Supabase error:', error);
        throw error
        // throw new Error('Failed to register user. Please try again.');
      } else {
        revalidatePath('/login');
        console.log('User added successfully', data);
        return { success: true, message: 'Success', alertType: 'success' };;
        
      }

    } catch (error) {
      // Handle other errors
      console.error('Error:', error);
      throw error;
    }
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  try {
    const res = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('res', res.error);
    if(!res.error) {

      const userDetailResponse = await getUserById(res.data.user.id);
      // const userDetailResponse = await getUserById('123');
      console.log('userDetailResponse', userDetailResponse);
      try {
        if(!userDetailResponse.error) {
          return userDetailResponse;
        }
        
        return {error: 'unexpected error'}

      } catch (err) {
        throw err
      }
    }
    // console.error('Supabase error:', res);
    return res;

  } catch (error) {
    throw error
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export const getHoroscopeSign = async (dob) => {
  const [year, month, day] = dob.split('-').map(Number);

  switch (month) {
    case 1:
      return day <= 19 ? 'Capricorn' : 'Aquarius';
    case 2:
      return day <= 18 ? 'Aquarius' : 'Pisces';
    case 3:
      return day <= 20 ? 'Pisces' : 'Aries';
    case 4:
      return day <= 19 ? 'Aries' : 'Taurus';
    case 5:
      return day <= 20 ? 'Taurus' : 'Gemini';
    case 6:
      return day <= 20 ? 'Gemini' : 'Cancer';
    case 7:
      return day <= 22 ? 'Cancer' : 'Leo';
    case 8:
      return day <= 22 ? 'Leo' : 'Virgo';
    case 9:
      return day <= 22 ? 'Virgo' : 'Libra';
    case 10:
      return day <= 22 ? 'Libra' : 'Scorpio';
    case 11:
      return day <= 21 ? 'Scorpio' : 'Sagittarius';
    case 12:
      return day <= 21 ? 'Sagittarius' : 'Capricorn';
    default:
      return 'Unknown';
  }
};


export const getDailyHorosCopes = async (sign) => {

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  // const formattedDate = '2024-01-02';

  console.log('formattedDate', formattedDate);

  try {
    const url = 'https://newastro.vercel.app'
    const res = await fetch(`${url}/${sign}?date=${formattedDate}`);
    const data = await res.json();
    console.log('data', data);
    return data;
  } catch (error) {
    throw error;
  }
}



  
  