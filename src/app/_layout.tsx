import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { LogBox } from "react-native";
// LogBox.ignoreAllLogs(true);
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    </>
  );
}
// harihskumaraffdfsdf