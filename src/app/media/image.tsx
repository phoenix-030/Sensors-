import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Asset } from "expo-asset";
import { useImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function ImageScreen() {
  const [uri, setUri] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const asset = Asset.fromModule(require("../../../assets/5_2af2ca48.jpg"));
      await asset.downloadAsync();
      setUri(asset.localUri || asset.uri);
      setImageSize({
        width: asset.width ?? 0,
        height: asset.height ?? 0,
      });
    };
    load();
  }, []);

  const manipulator = useImageManipulator(uri);

  // ── Rotate ──────────────────────────────────────────────────────────────
  const rotate = async () => {
    setLoading(true);
    try {
      manipulator.rotate(90);
      const rendered = await manipulator.renderAsync();
      const result = await rendered.saveAsync({ format: SaveFormat.PNG });
      setUri(result.uri);
      setImageSize({ width: result.height, height: result.width }); // swap after rotate
    } finally {
      setLoading(false);
    }
  };

  const cropCenter = async () => {
    if (!imageSize.width || !imageSize.height) {
      Alert.alert("Error", "Image size not available yet.");
      return;
    }
    setLoading(true);
    try {
      const side = Math.min(imageSize.width, imageSize.height);
      const originX = (imageSize.width - side) / 2;
      const originY = (imageSize.height - side) / 2;

      manipulator.crop({
        originX,
        originY,
        width: side,
        height: side,
      });

      const rendered = await manipulator.renderAsync();
      const result = await rendered.saveAsync({ format: SaveFormat.PNG });
      setUri(result.uri);
      setImageSize({ width: side, height: side });
    } finally {
      setLoading(false);
    }
  };

  if (!uri) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backarrow} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="#333" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Image Manipulator</Text>

      {/* Image Card */}
      <View style={styles.card}>
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        {/* Rotate */}
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#007AFF" }]}
          onPress={rotate}
          disabled={loading}
        >
          <Ionicons name="refresh-circle-outline" size={22} color="#fff" />
          <Text style={styles.btnLabel}>Rotate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#34C759" }]}
          onPress={cropCenter}
          disabled={loading}
        >
          <Ionicons name="crop-outline" size={22} color="#fff" />
          <Text style={styles.btnLabel}>Crop</Text>
        </TouchableOpacity>

        
      </View>

      <Text style={styles.hint}>Crop: auto center-square crop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backarrow: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 24,
    marginTop: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
    marginBottom: 28,
    position: "relative",
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  btnLabel: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
