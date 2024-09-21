import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const tinderCardWidth = Dimensions.get("screen").width * 0.8;
export const screenWidth = Dimensions.get("screen").width;

type TinderCardProps = {
  user: {
    id: number;
    name: string;
    image: string;
  };
  totalUser: number;
  curIndex: number;
  activeIndex: SharedValue<number>;
};

const TinderCard = ({
  user,
  totalUser,
  curIndex,
  activeIndex,
}: TinderCardProps) => {
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => console.log("onBegin"))
    .onStart((event) => console.log("onStart"))
    .onChange((event) => {
      translateX.value = event.translationX;
      activeIndex.value = interpolate(
        Math.abs(translateX.value),
        [0, 500],
        [curIndex, curIndex + 0.8],
      );
    })
    .onEnd((event) => {
      const threshold = 400;
      if (Math.abs(event.velocityX) > threshold) {
        translateX.value = withSpring(Math.sign(event.velocityX) * 500, {
          velocity: event.velocityX,
        });
        activeIndex.value = withSpring(activeIndex.value + 1);
      } else {
        translateX.value = withSpring(0);
      }
    })
    .onFinalize((event) => console.log("onFinalise"));

  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [curIndex - 1, curIndex, curIndex + 1],
      [1 - 1 / 5, 1, 1],
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [curIndex - 1, curIndex, curIndex + 1],
          [0.95, 1, 1],
        ),
      },
      {
        translateY: interpolate(
          activeIndex.value,
          [curIndex - 1, curIndex, curIndex + 1],
          [-30, 0, 0],
        ),
      },
      {
        translateX: translateX.value,
      },
      {
        rotateZ: `${interpolate(translateX.value, [-screenWidth / 2, 0, screenWidth / 2], [-15, 0, 15])}deg`,
      },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          animatedCard,
          {
            zIndex: totalUser - curIndex,
            //transform: [
            //  { translateY: -curIndex * 30 },
            //  { scale: 1 - curIndex * 0.05 },
            //],
          },
        ]}
      >
        <Image
          style={[StyleSheet.absoluteFillObject, styles.image]}
          source={{ uri: user.image }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />

        <View style={styles.footer}>
          <Text style={styles.name}>
            #{curIndex + 1} {user.name}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  card: {
    width: tinderCardWidth,
    //backgroundColor: "pink",
    aspectRatio: 1 / 1.67,
    position: "absolute",
    justifyContent: "flex-end",
    overflow: "hidden",
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
  },
  overlay: {
    top: "50%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  image: {},
  footer: {
    padding: 20,
  },
  name: {
    fontFamily: "InterBold",
    fontSize: 24,
    color: "#ffffff",
  },
});
