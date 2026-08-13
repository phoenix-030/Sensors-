import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SensorsIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensors</Text>
      <Text style={styles.subtitle}>Live readings from your device</Text>
      <View style={styles.list}>
        <Link href="/sensors/accelero" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Accelerometer</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/barometer" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Barometer</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/gyroscope" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gyroscope</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/light" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Light</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/magnetometer" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Magnetometer</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/perdometer" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pedometer</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sensors/location" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Location</Text>
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
