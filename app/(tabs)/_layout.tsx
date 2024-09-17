import { useAuth } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function TabLayout() {

  const {isLoggedIn, logout} = useAuth()

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={logout}>
        {isLoggedIn && <Ionicons name="log-out-outline" size={24} color="black" />}
      </TouchableOpacity>
      <Tabs screenOptions={
            {headerShown: false}
          } >
            <Tabs.Screen name="index" options={{tabBarLabel: "My visa"}} />
            <Tabs.Screen name="visas" options={{tabBarLabel: "All visas"}}/>
      </Tabs>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconButton: {
    position: 'absolute',
    right: 20, // Position 20 units from the right side
    top: 40,   // Position 40 units from the top (you can adjust this)
    zIndex: 1, // Ensure the button is on top of other elements
  }
});
