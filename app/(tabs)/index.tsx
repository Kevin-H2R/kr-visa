import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from 'react-native';

export default function Index() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        console.log('yoyo')
        setIsLoggedIn(!!value)
      } catch (e) {
        console.log(e)
      }
    };
    checkLoggedIn()
  }, [])

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
        {/* <Skeleton width={100} height={150} /> */}
        <View style={styles.visaSection}/>
        <View style={{flex: 1, gap: 10, justifyContent:'space-between', height: '100%'}}>
          <View style={{flex: 1, gap: 10}}>
            <View style={styles.nameSection} />
            <View style={styles.nameSection} />
          </View>
          <View style={styles.nameSection} />
        </View>
      </View>
      <Link href="/login" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Login to see or add my visa</Text>
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
    borderRadius: 10
  },
  nameSection: {
    backgroundColor: '#eee',
    width: 100,
    height: 20,
    borderRadius: 50
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
