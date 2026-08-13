import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function ImagePickerScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Ask Permission
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "Please allow gallery permission."
      );
      return;
    }

    // Open Gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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

      {/* Title */}
      <Text style={styles.title}>Image Picker</Text>

      {/* Card */}
      <View style={styles.card}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.placeholder}>
            No Image Selected
          </Text>
        )}
      </View>

      {/* Pick Image Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Pick Image
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
    height: 320,
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    padding: 15,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },

  placeholder: {
    fontSize: 18,
    color: "gray",
    fontWeight: "600",
  },

  button: {
    width: "70%",
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