import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { CameraView } from "expo-camera";

export default function Home() {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <CameraView style={StyleSheet.absoluteFillObject}
      facing="front"
      onBarcodeScanned={({data}) => {
        console.log(data);
      }}
      />

    </SafeAreaView>
  );
}
