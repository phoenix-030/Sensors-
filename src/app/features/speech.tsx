import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Speech from "expo-speech";


export default function SpeechScreen() {
  const speak = () => {
    Speech.speak("Hello! Welcome to the Speech Sensor.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech Sensor</Text>
      <View style={styles.card}>
        <Text style={styles.text}>
          Press the button below to hear the speech.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={speak}>
        <Text style={styles.buttonText}>Speak</Text>
      </TouchableOpacity>
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
