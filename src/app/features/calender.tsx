import React, { useEffect, useState } from "react";
import {  View,  Text,  FlatList,  TouchableOpacity,  StyleSheet,  Platform,  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import * as Calendar from "expo-calendar/legacy";

export default function CalendarScreen() {
  const [permission, setPermission] = useState(false);
  const [calendars, setCalendars] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
        const allCalendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT,
        );
        setCalendars(allCalendars);
      } else {
        setPermission(false);
      }
    })();
  }, []);

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createCalendar() {
    if (!permission) {
      Alert.alert("Permission required", "Calendar permission not granted.");
      return;
    }

    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar", type: "" };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      ...(Platform.OS === "ios" && {
        sourceId: (defaultCalendarSource as Calendar.Source).id,
      }),
      source: defaultCalendarSource as Calendar.Source,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    console.log(`Your new calendar ID is: ${newCalendarID}`);
    Alert.alert("Success", `Calendar created! ID: ${newCalendarID}`);

    // Refresh list
    const allCalendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );
    setCalendars(allCalendars);
  }



  return (
    <View style={styles.container}>
   
      <TouchableOpacity style={styles.backarrow} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>Calendar Module</Text>

      <TouchableOpacity style={styles.button} onPress={createCalendar}>
        <Text style={styles.buttonText}>Create Calendar</Text>
      </TouchableOpacity>

      {!permission && (
        <Text style={styles.permission}>Calendar permission not granted.</Text>
      )}

      <FlatList
        data={calendars}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📅 {item.title}</Text>

            <Text style={styles.text}>
              <Text style={styles.label}>ID :</Text> {item.id}
            </Text>


            <Text style={styles.text}>
              <Text style={styles.label}>Source :</Text> {item.source?.name}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.label}>Editable :</Text>{" "}
              {item.allowsModifications ? "Yes" : "No"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 90,
  },

  backarrow: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    width: "70%",
    alignSelf: "center",
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

  permission: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 18,
    elevation: 4,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#007AFF",
  },

  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },

  label: {
    fontWeight: "bold",
  },
});
