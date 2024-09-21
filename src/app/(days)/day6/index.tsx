import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Button from "@/src/compontents/Button";
import AntDesign from "@expo/vector-icons/AntDesign";

const DayScreen = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 10, gap: 10 }}>
      <Stack.Screen options={{ title: `Day 6: Tinder Card ` }} />
      <Text
        style={{
          marginBottom: 10,
          color: "white",
          fontSize: 20,
          fontFamily: "Inter800",
        }}
      >
        Tinder swipe card features
      </Text>

      <Link asChild href={"(days)/day6/tinder"}>
        <Button text={`Tinder Card Go To`} />
      </Link>
    </View>
  );
};

export default DayScreen;

const styles = StyleSheet.create({});
