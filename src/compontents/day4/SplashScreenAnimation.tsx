import { Pressable, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useEffect, useRef } from "react";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const SplashScreenAnimation = ({
  onAnimationFinish = (isCancelled) => {},
}: {
  onAnimationFinish: (isCancelled: boolean) => void;
}) => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    // Play the animation from frame 30 to frame 90
    animationRef.current?.play(30, 90);
  }, []);

  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.page}>
      <AnimatedLottieView
        entering={FadeIn.duration(200)}
        exiting={ZoomOut.duration(1000)}
        autoPlay
        ref={animationRef}
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={{
          width: "80%",
          maxWidth: 400,
          aspectRatio: 1,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("@/assets/lotties/netflix.json")}
      />
    </Animated.View>
  );
};

export default SplashScreenAnimation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
