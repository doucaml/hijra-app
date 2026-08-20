import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 p-2 gap-y-4 bg-brown-50">
      <View className="mx-auto w-18 h-2 rounded-full bg-brown-500" />
      <Slot />
    </View>
  );
}
