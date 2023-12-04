import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]); 

  const runLogin = async (email, password) => {
    let { data, error } = '';
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      return { data: response.data, error: null };
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: 'Login failed. Please check your credentials.',
      };
    }

    return { data, error };
  };

  const login = async (email, password) => {
    const { data, error } = await runLogin(email, password);
    console.log('Login data:', data);
    console.log('Login error:', error);

    if (data) {
      console.log(data);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('fullname', data.user.fullname);
      localStorage.setItem('firstname', data.user.firstname);
      localStorage.setItem('user_id', data.user._id);

      setIsLoggedIn(true);
      setFullname(data.user.fullname);
      setFullname(data.user.firstname);

      setError('');
    } else {
      console.log(error);

      setError(error);
    }
    return { data, error };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('firstname');
    localStorage.removeItem('user_id');
    localStorage.removeItem('combinedData');

    setIsLoggedIn(false);
    setIsAdmin(false);
    setFullname('');
    setFirstname('');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        fullname,
        firstname,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
