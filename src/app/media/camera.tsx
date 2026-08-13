import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [facing, setFacing] = useState<CameraType>("back");
  const [torch, setTorch] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Camera Permission Required</Text>

        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();

    if (photo?.uri) {
      setPhotoUri(photo.uri);
    }
  };

  const toggleCamera = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));

    if (facing === "back") {
      setTorch(false);
    }
  };

  const toggleTorch = () => {
    if (facing === "back") {
      setTorch(!torch);
    }
  };

  if (photoUri) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backarrow}
        >
          <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Captured Photo</Text>

        <View style={styles.card}>
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
            contentFit="contain"
          />
        </View>

        <TouchableOpacity
          style={styles.anotherbtn}
          onPress={() => setPhotoUri(null)}
        >
          <Text style={styles.buttonText}>Take Another</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backarrow}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Camera Sensor</Text>

      <View style={styles.card}>
        {cameraOn ? (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            enableTorch={torch}
          />
        ) : (
          <View style={styles.cameraOff}>
            <Text style={{ fontSize: 18 }}>Camera Stopped</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraOn(!cameraOn)}
        >
          <Text style={styles.buttonText}>{cameraOn ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleTorch}>
          <Ionicons
            name={torch ? "flash" : "flash-off"}
            color="white"
            size={22}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleCamera}>
          <FontAwesome6 name="rotate-left" color="white" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={takePicture}
          disabled={!cameraOn}
        >
          <Ionicons name="camera" color="white" size={22} />
        </TouchableOpacity>
      </View>
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
    marginBottom: 25,
  },

  card: {
    width: "95%",
    height: 450,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 30,
  },

  camera: {
    flex: 1,
  },

  cameraOff: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  anotherbtn: {
    width: "95%",
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
});
