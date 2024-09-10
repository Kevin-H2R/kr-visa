import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isConfirmationError, setIsConfirmationError] = useState(false)

  const resetErrors = () => {
    setIsEmailError(false)
    setIsPasswordError(false)
    setIsConfirmationError(false)
    setError("")
  }

  const login = async () => {
    try {
      resetErrors()
      if (!email || !password) {
        if (!email) {
          setIsEmailError(true)
        }
        if (!password) {
          setIsPasswordError(true)
        }
        setError("Fill email & password")
        return
      }
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        return
      }
      AsyncStorage.setItem('access_token', data['access_token'])
      AsyncStorage.setItem('refresh_token', data['refresh_token'])
      AsyncStorage.setItem('email', email)
      router.replace('/')
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const register = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        setError("Fill email & password & confirmation")
        return
      }
      if (password !== confirmPassword) {
        setError('Password and confirmation do no match')
        return
      }
      setError("")
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        padding: 25,
      }}
    >
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
        <Pressable style={{alignSelf: 'baseline'}} onPress={() => router.replace('/')}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'center', gap: 15, alignItems: 'center'}}>
        <TextInput placeholder="Email" style={[styles.input, isEmailError ? styles.errorInput : null]}
          value={email} onChangeText={text => setEmail(text)} />
        <TextInput placeholder="Password" secureTextEntry={true}
          style={[styles.input, isPasswordError ? styles.errorInput : null]} value={password} onChangeText={text => setPassword(text)} />
          {!isLogin &&
            <TextInput placeholder="Confirm password" secureTextEntry={true}
              style={[styles.input, isConfirmationError ? styles.errorInput : null]}
              value={confirmPassword} onChangeText={text => setConfirmPassword(text)} />}
          {error && <Text style={styles.error}>{error}</Text>}
          {!isLogin &&
            <Pressable style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>}
          {isLogin &&
            <Pressable style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>}
          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.underlineText}>{isLogin ? 'Register' : 'Login'}</Text>
          </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8
  },
  errorInput: {
    borderColor: '#CD2E3A'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0047A0',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  underlineText: {
    color: '#0047A0',
    textDecorationLine: 'underline'
  },
  error: {
    color:'#CD2E3A',
    fontSize: 12,
    fontWeight: 'bold',
  }
})
