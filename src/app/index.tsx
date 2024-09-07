import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Box from "@/src/compontents/box";
import {
  Inter_900Black,
  useFonts,
  Inter_300Light,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Inter800: Inter_800ExtraBold,
    Inter900: Inter_900Black,
    Inter300: Inter_300Light,
    Inter400: Inter_400Regular,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  const totalProjects: number[] = [...Array(24)].map(
    (item, index) => index + 1,
  );
  return (
    <View style={styles.container}>
      <Text style={styles.introText}>Welcome To DeVember Projects</Text>
      <FlatList
        data={totalProjects}
        renderItem={({ item }) => <Box day={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    padding: 10,
  },
  introText: {
    fontSize: 20,
    fontFamily: "Inter800",
    color: "white",
  },
});
