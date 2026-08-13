import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const symbols = [
  "home",
  "person",
  "group",
  "settings",
  "notifications",
  "favorite",
  "star",
  "bookmark",
  "search",
  "camera-alt",
  "photo",
  "videocam",
  "mic",
  "phone",
  "message",
  "email",
  "send",
  "shopping-cart",
  "shopping-bag",
  "credit-card",
  "event",
  "access-time",
  "location-on",
  "map",
  "wifi",
  "lock",
  "lock-open",
  "vpn-key",
  "delete",
  "file-upload",
  "file-download",
  "add-circle",
  "remove-circle",
  "check-circle",
  "cancel",
] as const;

export default function icons() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {symbols.map((symbol) => (
        <View key={symbol} style={styles.item}>
          <MaterialIcons name={symbol} size={40} tintColor="#007AFF" />
          <Text style={styles.text}>{symbol}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
