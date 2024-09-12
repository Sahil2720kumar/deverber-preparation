import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Button from "@/src/compontents/Button";
import AntDesign from "@expo/vector-icons/AntDesign";

const DayScreen = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 10, gap: 10 }}>
      <Stack.Screen options={{ title: `Day 4: Animated splash screen` }} />
      <Text
        style={{
          marginBottom: 10,
          color: "white",
          fontSize: 20,
          fontFamily: "Inter800",
        }}
      >
        Animated Splash Screen
      </Text>
      <Link asChild href={"(days)/day4/animation"}>
        <Button text={`Animation Go To`} />
      </Link>

      <Link asChild href={"(days)/day4/splash"}>
        <Button text={`Go To Animated Splash Screen`} />
      </Link>
    </View>
  );
};

export default DayScreen;

const styles = StyleSheet.create({});
