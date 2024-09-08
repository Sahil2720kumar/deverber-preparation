import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Box from "@/src/compontents/box";

export default function App() {
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
    //fontFamily: "Inter800",
    color: "white",
  },
});
