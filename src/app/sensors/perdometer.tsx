import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pedometer } from "expo-sensors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function PedometerScreen() {
  const [isAvailable, setIsAvailable] = useState("Checking...");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (!isTracking) {
      return;
    }

    let isActive = true;
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    const startPedometer = async () => {
      try {
        const available = await Pedometer.isAvailableAsync();
        if (!isActive) return;

        if (!available) {
          setIsAvailable("Not available on this device");
          setIsTracking(false);
          return;
        }

        const permission = await Pedometer.requestPermissionsAsync();
        if (!isActive) return;

        if (!permission.granted) {
          setIsAvailable("Motion permission denied");
          setIsTracking(false);
          return;
        }

        setIsAvailable("Available");

        // Expo SDK 56 supports historical step counts on iOS only.
        if (Platform.OS === "ios") {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);
          const result = await Pedometer.getStepCountAsync(start, end);

          if (!isActive) return;
          setPastStepCount(result.steps);
        }

        subscription = Pedometer.watchStepCount((result) => {
          if (isActive) setCurrentStepCount(result.steps);
        });
      } catch {
        if (isActive) {
          setIsAvailable("Unable to start pedometer");
          setIsTracking(false);
        }
      }
    };

    void startPedometer();

    return () => {
      isActive = false;
      subscription?.remove();
    };
  }, [isTracking]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backarrow}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back-circle-sharp"
          size={35}
          color="black"
        />
      </TouchableOpacity>

      <Text style={styles.title}>Pedometer Sensor</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Status : {isAvailable}
        </Text>

        <Text style={styles.text}>
          Last 24 Hours : {Platform.OS === "ios" ? pastStepCount : "iOS only"}
        </Text>

        <Text style={styles.text}>
          Current Steps : {currentStepCount}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsTracking((tracking) => !tracking)}
        >
          <Text style={styles.buttonText}>
            {isTracking ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  backarrow: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    elevation: 4,
    marginBottom: 30,
  },

  text: {
    fontSize: 22,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "600",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },

  button: {
    width: "60%",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
