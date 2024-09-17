import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<{
  login?: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout?: () => void;
  refresh?: () => void;
  isLoggedIn?: () => Promise<boolean>;
  getAccessToken?: () => Promise<string | null | undefined>;
}>({});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const data = await response.json()

    if (!response.ok) {
      return {success: false, message: data.message}
    }
    AsyncStorage.setItem('access_token', data['access_token'])
    AsyncStorage.setItem('refresh_token', data['refresh_token'])
    AsyncStorage.setItem('email', email)
    return {success: true, message: ""}
  }

  const isLoggedIn = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      return !!access_token
    } catch (e) {
      return false
    }
  };

  const getAccessToken = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      return access_token
    } catch (e) {
      console.log(e)
    }
  };

  const refresh = async () => {
    const refresh_token = await AsyncStorage.getItem('refresh_token')
    const response = await fetch("http://localhost:3000/auth/refresh", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token: refresh_token})
    })
    if (response.status === 403) {
      await AsyncStorage.clear()
      window.location.reload()
    }
    const data = await response.json()
    AsyncStorage.setItem('access_token', data['access_token'])
    AsyncStorage.setItem('refresh_token', data['refresh_token'])
  }

  const logout = async () => {
    await AsyncStorage.clear()
  }

  return <AuthContext.Provider value={{isLoggedIn, login, logout, getAccessToken, refresh}}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
