import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [status, setStatus] = useState("Checking Permission...");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    // Ask for location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setStatus("Permission Denied");
      return;
    }

    setStatus("Permission Granted");

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    setAccuracy(location.coords.accuracy ?? 0);
  };

  const openSettings = () => {
    Linking.openSettings();
  };

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

      <Text style={styles.title}>Location Sensor</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Status : {status}
        </Text>

        <Text style={styles.text}>
          Latitude :
        </Text>

        <Text style={styles.value}>
          {latitude ?? "--"}
        </Text>

        <Text style={styles.text}>
          Longitude :
        </Text>

        <Text style={styles.value}>
          {longitude ?? "--"}
        </Text>

        <Text style={styles.text}>
          Accuracy :
        </Text>

        <Text style={styles.value}>
          {accuracy ? `${accuracy.toFixed(2)} m` : "--"}
        </Text>
      </View>

      {/* Settings Button */}
      {status === "Permission Denied" && (
        <TouchableOpacity
          style={styles.button}
          onPress={openSettings}
        >
          <Text style={styles.buttonText}>
            Open App Settings
          </Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 30,
  },

  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
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