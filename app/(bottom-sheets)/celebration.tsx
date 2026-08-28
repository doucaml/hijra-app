import { Celebrations, useDate } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function HolidayScreen() {
  const { hijrahDate, gregorianDate } = useDate();
  const { celebrationIndex } = useLocalSearchParams();
  const celebration =
    Celebrations[hijrahDate.month]?.[hijrahDate.day][Number(celebrationIndex)];

  return (
    <View className="flex-1 gap-y-4">
      <View className="gap-y-2">
        <Text className="text-xl font-bold text-brown-700">
          {celebration.title}
        </Text>

        <Text className="text-gray-700 font-light">
          {hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} -{" "}
          {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
        </Text>
      </View>
      <Text className="font-light text-[17px]">{celebration.description}</Text>
    </View>
  );
}
