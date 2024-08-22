import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const login = () => {
    try {
      console.log("YEAH")
      fetch('http://172.18.70.50:3000').then(response => console.log(response)).catch(err => console.log("err: ", err))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        gap: 15
      }}
    >
      <TextInput placeholder="Email" style={styles.input}
        value={email} onChangeText={text => setEmail(text)} />
      <TextInput placeholder="Password" secureTextEntry={true}
        style={styles.input} value={password} onChangeText={text => setPassword(text)} />
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
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
})
