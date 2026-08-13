import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FeaturesIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Features</Text>
      <Text style={styles.subtitle}>Useful device and platform examples</Text>
      <View style={styles.list}>
        <Link href="/features/battery" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Battery</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/features/calender" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/features/icons" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Icons</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/features/map" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/features/speech" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Speech</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/features/symbols" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Symbols</Text>
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
