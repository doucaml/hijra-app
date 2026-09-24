import { CalendarDate, Celebrations } from "@/utils/dates";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function HolidayScreen() {
  const { celebrationIndex, day, month } = useLocalSearchParams();

  const [intDay, intMonth, intCelebrationIndex] = [
    Number(day),
    Number(month),
    Number(celebrationIndex),
  ];

  const calendarDate = new CalendarDate(intDay, intMonth);

  const celebration = Celebrations[intMonth]?.[intDay][intCelebrationIndex];

  return (
    <View className="flex-1 gap-y-4 p-4">
      <View className="gap-y-2">
        <Text className="text-xl text-center font-bold text-brown-700">
          {celebration.title}
        </Text>

        <Text className="text-gray-700 font-light">
          {calendarDate.hijrahDate.day} {calendarDate.hijrahDate.monthEnStr}{" "}
          {calendarDate.hijrahDate.year} - {calendarDate.gregorianDate.day}{" "}
          {calendarDate.gregorianDate.monthEnStr}{" "}
          {calendarDate.gregorianDate.year}
        </Text>
      </View>
      <Text className="font-light text-[17px]">{celebration.description}</Text>
    </View>
  );
}
