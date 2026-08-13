import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { LightSensor } from "expo-sensors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function LightSensorScreen() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });

  const [subscription, setSubscription] = useState<any>(null);
  const startSensor = () => {
    if (subscription) return;
    const sensorSubscription = LightSensor.addListener((data) => {
      setData(data);
    });
    setSubscription(sensorSubscription);
  };

  const stopSensor = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };
  useEffect(() => {
    startSensor();

    return () => {
      stopSensor();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backarrow} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Light Sensor</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Status : {Platform.OS === "android" ? "Available" : "Not Supported"}
        </Text>

        <Text style={styles.text}>Illuminance :</Text>

        <Text style={styles.value}>
          {Platform.OS === "android" ? `${illuminance.toFixed(2)} lx` : "--"}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={subscription ? stopSensor : startSensor}
        >
          <Text style={styles.buttonText}>
            {subscription ? "Stop" : "Start"}
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

  value: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 10,
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
