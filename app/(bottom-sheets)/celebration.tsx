import { Events, useDate } from "@/utils";
import { View, Text } from "react-native";

export default function HolidayScreen() {
  const { hijrahDate, gregorianDate } = useDate();
  const holiday = Events[hijrahDate.month]?.[hijrahDate.day];

  return (
    <View className="flex-1 gap-y-4">
      <View className="gap-y-2">
        <Text className="text-2xl font-oleo-script text-brown-700">
          {holiday.title}
        </Text>

        <Text className="text-gray-700 font-light">
          {hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} -{" "}
          {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
        </Text>
      </View>
      <Text className="font-light text-[17px]">{holiday.description}</Text>
    </View>
  );
}
