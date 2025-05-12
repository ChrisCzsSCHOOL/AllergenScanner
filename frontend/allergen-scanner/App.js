import { useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";

export default function App() {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(cameraPermission?.granted);

  return (
    <View style={styles.container}>
      <Text>Allergen Scanner!</Text>
      <StatusBar style="auto" />

      <Pressable onPress={requestPermission}>
        <Text>Request Camera Permission</Text>
      </Pressable>

      <Link href={"/scanner"} asChild>
        <Pressable disabled={!isPermissionGranted}>
          <Text style={[{ opacity: !isPermissionGranted ? 0.5 : 1 }]}>
            Go to Scanner
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
