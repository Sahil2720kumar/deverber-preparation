import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Box = ({ day }: { day: number }) => {
  return (
    <Link href={`(days)/day${day}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.introText}>{day}</Text>
      </Pressable>
    </Link>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A0A0A",
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  introText: {
    fontSize: 20,
    fontFamily: "Inter400",
    color: "white",
  },
});
