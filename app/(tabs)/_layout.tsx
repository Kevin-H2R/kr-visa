import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={
      {headerShown: false}
    } >
      <Tabs.Screen name="index" options={{tabBarLabel: "My visa"}} />
      <Tabs.Screen name="visas" options={{tabBarLabel: "All visas"}}/>
    </Tabs>
  );
}
