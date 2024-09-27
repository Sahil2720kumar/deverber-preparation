import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AudioListItem from "@/src/compontents/day7/AudioListItem";
import { Stack } from "expo-router";

export default function MemosScreen() {
  const [recording, setRecording] = useState<Recording>();
  const [memos, setMemos] = useState<string[]>([]);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    //console.log("Recording stopped and stored at", uri);
    if (uri) {
      setMemos((existingMemos) => [...existingMemos, uri]);
    }
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording ? "50%" : "80%"),
    borderRadius: withTiming(recording ? 5 : 35),
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Voice Recorder" }} />
      <FlatList
        data={memos}
        renderItem={({ item }) => <AudioListItem uri={item} />}
        contentContainerStyle={{ gap: 8 }}
      />

      <View style={styles.footer}>
        <View>
          <Pressable
            style={styles.recordButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <Animated.View style={[styles.redCircle, animatedRedCircle]} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    padding: 10,
  },
  footer: {
    backgroundColor: "#0A0A0A",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,

    borderWidth: 3,
    borderColor: "white",
    padding: 3,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  redCircle: {
    backgroundColor: "orangered",
    aspectRatio: 1,
  },
});
