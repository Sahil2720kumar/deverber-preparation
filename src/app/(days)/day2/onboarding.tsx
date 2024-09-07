import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StatusBar } from "expo-status-bar";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "snowflake",
    title: "Welcome #DEVember",
    description: "Daily React Native tutorials during December",
  },
  {
    icon: "people-arrows",
    title: "Learn and grow together",
    description: "Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "book-reader",
    title: "Education for Children",
    description:
      'Contribute to the fundraiser "Education for Children" to help Save the Children in their effort of providing education to every child',
  },
];

const OnboatdingScreen = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const onContinue = () => {
    if (screenIndex < onboardingSteps.length - 1) {
      setScreenIndex(screenIndex + 1);
      return;
    }
    skipOnboarding();
  };

  const onBack = () => {
    if (screenIndex === 0) {
      router.back();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };
  const skipOnboarding = () => {
    router.back();
  };
  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),

    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  const data = onboardingSteps[screenIndex];
  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen
        options={{ title: `OnboatdingScreen`, headerShown: false }}
      />

      <StatusBar style="light" />
      <GestureDetector gesture={swipes}>
        <Animated.View style={styles.container} key={screenIndex}>
          <View style={styles.stepindicatorContainer}>
            {onboardingSteps.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.stepindicator,
                    {
                      backgroundColor: `${screenIndex === index ? "#CEF202" : "#302E38"}`,
                    },
                  ]}
                ></View>
              );
            })}
          </View>

          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.subContainer}
          >
            <FontAwesome5 name={`${data.icon}`} size={120} color="#CEF202" />
          </Animated.View>

          <View
            style={[
              styles.subContainer,
              {
                justifyContent: "flex-start",
                alignItems: "flex-start",
              },
            ]}
          >
            <Animated.Text
              entering={SlideInLeft}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>

            <Animated.Text
              entering={FadeInUp.delay(300)}
              exiting={FadeOutDown}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>
            <View style={styles.buttonRow}>
              <Text
                onPress={skipOnboarding}
                style={[styles.buttonText, { paddingRight: 20 }]}
              >
                Skip
              </Text>
              <Pressable style={styles.button} onPress={onContinue}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

export default OnboatdingScreen;
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#15141A",
    flex: 1,
  },
  container: {
    padding: 20,
    flexDirection: "column",
    gap: 10,
    flex: 1,
    //backgroundColor: "red",
  },
  subContainer: {
    flex: 1,
    //borderColor: "#FDFDFD",
    //borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "yellow",
    paddingHorizontal: 10,
  },
  title: {
    color: "#FDFDFD",
    fontFamily: "Inter900",
    fontSize: 50,
    letterSpacing: 1.2,
    marginBottom: 20,
  },
  description: {
    color: "grey",
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "Inter400",
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#302E38",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "#EDEDED",
    fontFamily: "InterBold",
    padding: 15,
    textAlign: "center",
  },
  stepindicatorContainer: {
    height: 20,
    gap: 7,
    flexDirection: "row",
    //padding: 20,
  },
  stepindicator: {
    height: 3,
    flex: 1,
    backgroundColor: "#302E38",
    borderRadius: 10,
  },
});
