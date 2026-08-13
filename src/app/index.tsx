import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="dashboard" size={52} color="#146c94" />
      <Text style={styles.title}>Mobile Components</Text>
      <Text style={styles.subtitle}>Choose an area to explore and Check</Text>

      <View style={styles.list}>
        <Link href="/sensors" asChild>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="sensors" size={32} color="#146c94" />
            <View>
              <Text style={styles.cardTitle}>Sensors</Text>
              <Text style={styles.cardDes}>Read your device sensors</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#6b7c85" />
          </TouchableOpacity>
        </Link>

        <Link href="/media" asChild>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="photo-library" size={32} color="#146c94" />
            <View>
              <Text style={styles.cardTitle}>Media</Text>
              <Text style={styles.cardDes}>Explore camera and images</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#6b7c85" />
          </TouchableOpacity>
        </Link>

        <Link href="/features" asChild>
          <TouchableOpacity style={styles.card}>
            <MaterialIcons name="auto-awesome" size={32} color="#146c94" />
            <View>
              <Text style={styles.cardTitle}>Features</Text>
              <Text style={styles.cardDes}>Try useful Expo features</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color="#6b7c85" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f4f8f7",
  },
  title: {
    marginTop: 12,
    color: "#12343b",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 4,
    color: "#587078",
    fontSize: 16,
    textAlign: "center",
  },
  list: { width: "100%", gap: 14, marginTop: 32 },
  card: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  cardTitle: { color: "#12343b", fontSize: 19, fontWeight: "700" },
  cardDes: { marginTop: 4, color: "#6b7c85", fontSize: 14 },
});
