import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0A0A0A" },
          headerTitleStyle: { color: "white" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
