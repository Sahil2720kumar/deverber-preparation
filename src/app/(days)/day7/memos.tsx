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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AudioListItem, { Memo } from "@/src/compontents/day7/AudioListItem";
import { Stack } from "expo-router";

export default function MemosScreen() {
  const [recording, setRecording] = useState<Recording>();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [audioMetering, setAudioMetering] = useState<number[]>([]);

  const metering = useSharedValue(-100);
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        undefined,
        100,
      );
      setRecording(recording);
      recording.setOnRecordingStatusUpdate((status) => {
        //console.log(JSON.stringify(status.metering, null, 2));
        metering.value = status.metering || -100;
        setAudioMetering((curVal) => [...curVal, status.metering || -100]);
      });
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
      setMemos((existingMemos) => [
        ...existingMemos,
        { uri: uri, metering: audioMetering },
      ]);
      metering.value = -100;
      setAudioMetering([]);
    }
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(recording ? "50%" : "80%"),
    borderRadius: withTiming(recording ? 5 : 35),
  }));

  const animatedRecordWave = useAnimatedStyle(() => {
    const size = withTiming(
      interpolate(metering.value, [-160, -60, 0], [0, 0, -30]),
      { duration: 100 },
    );
    //console.log(metering.value, size);

    //const size = -20;
    return {
      top: size,
      bottom: size,
      right: size,
      left: size,
      backgroundColor: "#FF000099",
      borderRadius: 1000,
    };
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Voice Recorder" }} />
      <FlatList
        data={memos}
        renderItem={({ item }) => <AudioListItem memo={item} />}
        contentContainerStyle={{ gap: 8 }}
      />

      <View style={styles.footer}>
        <View>
          <Animated.View style={[styles.recordWave, animatedRecordWave]} />
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
    zIndex: 999,
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
  recordWave: {
    position: "absolute",
    zIndex: -9999,
  },
});
