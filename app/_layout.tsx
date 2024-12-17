import theme from "@/data/constants";
import { FIREBASE_AUTH } from "@/firebase";
import { useStore } from "@/state/store";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs(true);

export default function RootLayoutNav() {
  const { user, setUser } = useStore();

  const [loaded, error] = useFonts({
    "Outfit-Light": require("../assets/fonts/outfit/Outfit-Light.ttf"),
    "Outfit-Regular": require("../assets/fonts/outfit/Outfit-Regular.ttf"),
    "Outfit-Medium": require("../assets/fonts/outfit/Outfit-Medium.ttf"),
    "Outfit-SemiBold": require("../assets/fonts/outfit/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("../assets/fonts/outfit/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("../assets/fonts/outfit/Outfit-ExtraBold.ttf"),
  });
  const router = useRouter();

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        router.push("/(tabs)");
      } else {
        router.replace("/");
      }
    });
    return () => unsubscribe();
  }, [user]);

  if (!loaded && !error) return null;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          color: theme.colors.light,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="projects/[projectId]" />
      <Stack.Screen name="chats/[chatId]" />
    </Stack>
  );
}
