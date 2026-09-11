import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 p-2 gap-y-4 bg-white">
      <View className="mx-auto w-8 h-1 rounded-full bg-stone-500" />
      <Slot />
    </View>
  );
}
