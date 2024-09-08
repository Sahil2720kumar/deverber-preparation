import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { Stack } from "expo-router";

const AnimationScreen = () => {
  const animation = useRef<LottieView>(null);
  return (
    <SafeAreaView edges={["bottom"]} style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView
        ref={animation}
        autoPlay
        style={{
          width: "80%",
          maxWidth: 200,
          aspectRatio: 1,
          backgroundColor: "#15141A",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/lotties/netflix.json")}
      ></LottieView>
    </SafeAreaView>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#15141A",
    alignItems: "center",
    justifyContent: "center",
  },
});
