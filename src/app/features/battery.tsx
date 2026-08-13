import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBatteryLevel } from "expo-battery";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function BatteryScreen() {
  const batteryLevel = useBatteryLevel();

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>Battery Sensor</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Current Battery Level</Text>

        <Text style={styles.value}>
          {batteryLevel !== null
            ? `${Math.round(batteryLevel * 100)} %`
            : "Loading..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
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
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  value: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007AFF",
  },
}); 