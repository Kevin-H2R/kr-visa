import { AuthProvider } from "@/context/authContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ animation: 'slide_from_bottom', headerShown: false }} />
      </Stack>
    </AuthProvider>

  );
}
