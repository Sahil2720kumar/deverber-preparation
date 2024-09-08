import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";
import MarkdownDisplay from "@/src/compontents/day3/MarkdownDisplay";
import { Stack } from "expo-router";

const MarkdownEditor = () => {
  const [content, setContent] = useState("# Sample Markdown");
  const [isEdit, setIsEdit] = useState("edit");

  return (
    <View style={styles.page}>
      <Stack.Screen options={{ title: "Markdown Editor" }} />
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setIsEdit("edit")}
          style={[
            styles.tab,
            { backgroundColor: `${isEdit === "edit" ? "#14151A" : "white"}` },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              { color: `${isEdit === "edit" ? "white" : "#14151A"}` },
            ]}
          >
            Edit
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setIsEdit("preview")}
          style={[
            styles.tab,
            {
              backgroundColor: `${isEdit === "preview" ? "#14151A" : "white"}`,
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              { color: `${isEdit === "preview" ? "white" : "#14151A"}` },
            ]}
          >
            Preview
          </Text>
        </Pressable>
      </View>
      <View style={styles.previewContainer}>
        {isEdit === "edit" ? (
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            underlineColorAndroid="transparent"
            placeholder="Type markdown here..."
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        ) : (
          <MarkdownDisplay>{content}</MarkdownDisplay>
        )}
      </View>
    </View>
  );
};

export default MarkdownEditor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 20,
    textDecorationStyle: "solid",
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#14141A",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "InterBold",

    color: "white",
  },
  previewContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  input: {
    borderRadius: 20,
    padding: 10,
    borderColor: "black",
    borderWidth: 3,
    fontFamily: "Inter400",
    justifyContent: "flex-start",
  },
});
