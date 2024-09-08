import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Inter_900Black,
  useFonts,
  Inter_300Light,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import SplashScreenAnimation from "../compontents/day4/SplashScreenAnimation";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

//SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);
  const [isSplashAnimationFinished, setIsSplashAnimationFinished] =
    useState(false);

  const [loaded, error] = useFonts({
    Inter800: Inter_800ExtraBold,
    Inter900: Inter_900Black,
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [loaded, error]);

  const showAnimatedSplash = !isReady || !isSplashAnimationFinished;

  if (showAnimatedSplash) {
    return (
      <SplashScreenAnimation
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setIsSplashAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View
        style={{ flex: 1 }}
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
      >
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#0A0A0A" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
