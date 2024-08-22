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
  const getData = async () => {
    try {
      console.log("YOYOYYOYO")
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        console.log(value)
      }
    } catch (e) {
      console.log(e)
    }
  };

  const login = async () => {
    try {
      if (!email || !password) return
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
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
      if (!email || !password || !confirmPassword) return
      if (password !== confirmPassword) return // TODO: handle error better
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      })
      const data = await response.json()
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
        <TextInput placeholder="Email" style={styles.input}
          value={email} onChangeText={text => setEmail(text)} />
        <TextInput placeholder="Password" secureTextEntry={true}
          style={styles.input} value={password} onChangeText={text => setPassword(text)} />
          {!isLogin &&
            <TextInput placeholder="Confirm password" secureTextEntry={true}
              style={styles.input} value={confirmPassword} onChangeText={text => setConfirmPassword(text)} />}
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
  }
})
