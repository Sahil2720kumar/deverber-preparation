import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const DayScreen = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 10 }}>
      <Stack.Screen options={{ title: `Day 1` }} />
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter400" }}>
        DayOne
      </Text>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter400" }}>
        Expo Router Setup
      </Text>
      <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter400" }}>
        Card (Day) Compontents Build
      </Text>
    </View>
  );
};

export default DayScreen;

const styles = StyleSheet.create({});
