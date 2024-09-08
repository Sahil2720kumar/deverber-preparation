import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Button from "@/src/compontents/Button";
import AntDesign from "@expo/vector-icons/AntDesign";

const DayTwoScreen = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 10 }}>
      <Stack.Screen options={{ title: `Day 3` }} />
      {/* <Text style={{ color: "white", fontSize: 20, fontFamily: "Inter400" }}>
        DayTwo
      </Text>*/}
      <Text
        style={{
          marginBottom: 10,
          color: "white",
          fontSize: 20,
          fontFamily: "Inter800",
        }}
      >
        MarkDown Editor Screen Setup{" "}
      </Text>
      <Link asChild href={"(days)/day3/editor"}>
        <Button text={`Go To`} />
      </Link>
    </View>
  );
};

export default DayTwoScreen;

const styles = StyleSheet.create({});
