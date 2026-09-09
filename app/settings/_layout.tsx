import { Slot } from "expo-router";
import { View } from "react-native";

export default function SettingsLayout() {
  return (
    <View className="flex-1 p-2">
      <Slot />
    </View>
  );
}
