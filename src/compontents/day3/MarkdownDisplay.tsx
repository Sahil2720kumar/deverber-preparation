import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import Markdown from "react-native-markdown-display";

const MarkdownDisplay = ({ children }: PropsWithChildren) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.page}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Markdown style={markdownStyles}>{children}</Markdown>
      </ScrollView>
    </View>
  );
};

export default MarkdownDisplay;

const markdownStyles = StyleSheet.create({
  heading1: {
    fontFamily: "Inter900",
  },
  heading2: {
    fontFamily: "InterBold",
  },
  heading3: {
    fontFamily: "InterBold",
  },
  body: {
    fontFamily: "Inter400",
  },
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 20,
    textDecorationStyle: "solid",
  },
});
