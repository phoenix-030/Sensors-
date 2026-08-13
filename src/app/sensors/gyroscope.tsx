import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gyroscope, } from "expo-sensors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function GyroscopeScreen() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [tracker, setTracker] = useState<any>(null);
  const slow = () => Gyroscope.setUpdateInterval(1000);
  const fast = () => Gyroscope.setUpdateInterval(16);

  const open = () => {
    if (tracker) return;

    const subscription = Gyroscope.addListener((gyroscopeData) => {
      setData(gyroscopeData);
    });

    setTracker(subscription);
  };

  const close = () => {
    if (tracker) {
      tracker.remove();
      setTracker(null);
    }
  };

  useEffect(() => {
    fast(); 
    open();

    return () => {
      close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backarrow}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Gyroscope Sensor</Text>

      <View style={styles.card}>
        <Text style={styles.text}>X : {x.toFixed(3)}</Text>
        <Text style={styles.text}>Y : {y.toFixed(3)}</Text>
        <Text style={styles.text}>Z : {z.toFixed(3)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={tracker ? close : open}
        >
          <Text style={styles.buttonText}>{tracker ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={slow}>
          <Text style={styles.buttonText}>Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={fast}>
          <Text style={styles.buttonText}>Fast</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  button: {
    flex: 1,
    backgroundColor: "#007AFF",
    marginHorizontal: 5,
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
