import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  login?: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: undefined,
  logout: () => {}
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = async (email: string, password: string) => {
    console.log("PIEWGFHWEOIGHWEROGIH")
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
    setIsLoggedIn(true)
    return {success: true, message: ""}
  }

  const logout = async () => {
    await AsyncStorage.clear()
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{isLoggedIn, login, logout}}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
