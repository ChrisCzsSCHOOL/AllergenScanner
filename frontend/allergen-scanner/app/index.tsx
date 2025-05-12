import { useCameraPermissions } from "expo-camera";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Allergen Scanner</Text>

      <Pressable onPress={requestPermission}>
        <Text>Request Permission</Text>
      </Pressable>

      <Link href={"/scanner"} asChild>
        <Pressable disabled={!isPermissionGranted}>
          <Text style={[{ opacity: !isPermissionGranted ? 0.5 : 1 }]}>
            Scan code
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
