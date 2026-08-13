import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MediaIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media</Text>
      <Text style={styles.subtitle}>Camera and image tools</Text>
      <View style={styles.list}>
        <Link href="/media/camera" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/media/image" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Image</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/media/imgpicker" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Image Picker</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/media/livephotos" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Live Photos</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f8f7",
  },
  title: { color: "#12343b", fontSize: 32, fontWeight: "800" },
  subtitle: { marginTop: 6, color: "#587078", fontSize: 16 },
  list: { gap: 14, marginTop: 28 },
  button: {
    minHeight: 64,
    justifyContent: "center",
    padding: 18,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  buttonText: { color: "#12343b", fontSize: 17, fontWeight: "700" },
});
