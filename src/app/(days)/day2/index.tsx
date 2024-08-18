import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const DayTwoScreen = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 10 }}>
      <Stack.Screen options={{ title: `Day 2` }} />
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter400" }}>
        DayTwo
      </Text>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter800" }}>
        OnBoarding Screen Setup{" "}
      </Text>
    </View>
  );
};

export default DayTwoScreen;

const styles = StyleSheet.create({});
