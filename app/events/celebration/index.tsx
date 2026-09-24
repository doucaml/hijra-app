import { CalendarDate, Celebrations } from "@/utils/dates";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

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
    <View className="flex-1 bg-brown-50 px-5 pt-5">
      <Text className="font-sans-semibold text-[28px] leading-9 text-brown-800">
        {celebration.title}
      </Text>

      <Text className="mt-3 font-sans text-sm leading-5 text-brown-600">
        {calendarDate.hijrahDate.day} {calendarDate.hijrahDate.monthEnStr}{" "}
        {calendarDate.hijrahDate.year} — {calendarDate.gregorianDate.day}{" "}
        {calendarDate.gregorianDate.monthEnStr}{" "}
        {calendarDate.gregorianDate.year}
      </Text>

      <View className="mb-7 mt-4 h-px bg-brown-200" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <Text className="font-sans text-base leading-7 text-brown-800">
          {celebration.description}
        </Text>
      </ScrollView>
    </View>
  );
}
