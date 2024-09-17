import { useAuth } from "@/context/authContext";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from 'react-native';

export default function Index() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [visa, setVisa] = useState<{subcategory: string, expiration_date: 'string'} | null>(null)
  const {getAccessToken, refresh} = useAuth()

  useEffect(() => {
    const grabUserData = async () => {
      try {
        const access_token = await getAccessToken!()
        setIsLoggedIn(!!access_token)
        if (!!access_token) {
          const response = await fetch('http://localhost:3000/users/visa', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'authorization': `Bearer ${access_token}`}
          })
          if (response.status === 403) {
            await refresh!()
            window.location.reload()
          }
          const json = await response.json()
          console.log(json)
          setVisa(json.visa)
        }
      } catch (e) {
        console.log(e)
      }
    };
    grabUserData()
  }, [])

  const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${(d.getDate()).toString().padStart(2, '0')}`
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        gap: 25
      }}
    >
      <View style={styles.visaCard}>
        <View style={styles.visaSection}>
          {visa && <Text>{visa.subcategory}</Text>}
        </View>
        <View style={{flex: 1, gap: 10, justifyContent:'space-between', height: '100%'}}>
          <View style={{flex: 1, gap: 10}}>
            <View style={styles.nameSection}>{visa && <Text>Firstname</Text>}</View>
            <View style={styles.nameSection}>{visa && <Text>Lastname</Text>}</View>
          </View>
          <View style={styles.nameSection}>{visa && <Text>{formatDate(visa.expiration_date)}</Text>}</View>
        </View>
      </View>
      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{visa ? "Edit my visa" : isLoggedIn ? "Add my visa" : "Login to see or add my visa"}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  visaCard: {
    backgroundColor: '#ccc',
    width: '80%',
    height: 200,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center'
  },
  visaSection: {
    backgroundColor: '#eee',
    width: 150,
    height: 180,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameSection: {
    backgroundColor: '#eee',
    width: 100,
    height: 20,
    borderRadius: 50,
    paddingHorizontal: 5,
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
