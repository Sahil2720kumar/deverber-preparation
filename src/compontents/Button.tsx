import { Pressable, StyleSheet, Text, View } from "react-native";
import { forwardRef } from "react";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={styles.container}>
        <Text style={styles.text}>
          {text}
          <AntDesign name="arrowright" size={16} color="#0A0A0A" />
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9EDE3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A0A0A",
    gap: 19,
  },
});

export default Button;
