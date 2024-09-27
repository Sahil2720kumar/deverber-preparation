import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const AudioListItem = ({ uri }: { uri: string }) => {
  const [sound, setSound] = useState<Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const soundRef = useRef<Sound | null>(null);

  function formatMilliseconds(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Zero-pad minutes and seconds
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      onPlaybackStatusUpdate,
    );
    soundRef.current = sound;
    setSound(sound);
  }

  async function playSound() {
    if (!sound) return;

    if (status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    } else if (
      status?.isLoaded &&
      status?.positionMillis === status.durationMillis
    ) {
      withDelay(3000, {});
      console.warn("jst finsished");
      sound?.setPositionAsync(0);
    } else {
      await sound.playAsync();
    }

    console.log(status);
  }

  const onPlaybackStatusUpdate = useCallback(
    (playbackStatus: AVPlaybackStatus) => {
      if (playbackStatus.isLoaded) {
        setStatus(playbackStatus);
      }
    },
    [sound],
  );

  useEffect(() => {
    loadSound();
  }, [uri]);

  useEffect(() => {
    // TODO: Check when expo-av updates. setOnPlaybackStatusUpdate works incorrectly:
    // onPlaybackStatusUpdate is not called during playing audio on Android.
    if (Platform.OS === "android" && soundRef.current) {
      const intervalId = setInterval(() => {
        const updatePlaybackStatus = async () => {
          const status = await soundRef.current?.getStatusAsync();
          if (status?.isLoaded) {
            setStatus(status); // Update state with the latest status
          }
        };
        updatePlaybackStatus();
      }, 500); // Polling every 500ms

      return () => clearInterval(intervalId); // Cleanup on unmount or sound change
    }
  }, [soundRef.current]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const isPlaying = status?.isLoaded ? status?.isPlaying : false;
  const duration = status?.isLoaded ? status?.durationMillis : 1000;
  const position = status?.isLoaded ? status?.positionMillis : 0;

  const progress = duration > 0 ? position / duration : 0;
  //console.log("duration: ",duration);

  const animatedPlaybackIndicator = useAnimatedStyle(() => ({
    left: withTiming(`${progress * 100}%`, { duration: 500 }),
    //left: `${progress * 100}%`,
  }));
  return (
    <View style={styles.container}>
      <Entypo
        onPress={playSound}
        name={isPlaying ? "controller-paus" : "controller-play"}
        size={26}
        color="white"
      />
      <View style={styles.playbackContainer}>
        <View style={styles.playbackBackground}>
          <Animated.View
            style={[styles.playbackBall, animatedPlaybackIndicator]}
          />
        </View>
        <View style={styles.timeStamp}>
          <Text style={styles.duration}>{formatMilliseconds(position)}/</Text>

          <Text style={styles.position}>
            {formatMilliseconds(duration || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AudioListItem;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    flex: 1,
    gap: 10,
  },
  playbackContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    paddingRight: 5,
    position: "relative",
  },
  playbackBackground: {
    width: "100%",
    height: 2,
    backgroundColor: "gainsboro",
    borderRadius: 20,
    position: "relative",
    justifyContent: "center",
  },
  playbackBall: {
    position: "absolute",
    width: 15,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  timeStamp: {
    position: "absolute",
    right: 0,
    bottom: -8,
    flexDirection: "row",
  },

  duration: {
    color: "white",
    fontFamily: "InterBold",
  },
  position: {
    color: "gainsboro",
    fontFamily: "InterBold",
  },
});
