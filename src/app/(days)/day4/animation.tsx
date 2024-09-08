import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import Button from "@/src/compontents/Button";

const AnimationScreen = () => {
  const animation = useRef<LottieView>(null);
  return (
    <SafeAreaView edges={["bottom"]} style={styles.page}>
      <LottieView
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#15141A",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/lotties/netflix.json")}
      ></LottieView>
      <View style={styles.buttonContainer}>
        <Button onPress={() => animation.current?.play()} text="Play" />
        <Button onPress={() => animation.current?.pause()} text="Pause" />
        <Button onPress={() => animation.current?.resume()} text="Resume" />
      </View>
    </SafeAreaView>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#15141A",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
  },
});
