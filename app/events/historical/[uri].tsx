import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { CalendarDate } from "@/utils/dates";
import { getHistoricalEvents } from "@/utils/calendarEvents";

export default function HistoricalEventScreen() {
  const { historicalIndex, day, month } = useLocalSearchParams();

  const intDay = Number(day);
  const intMonth = Number(month);
  const intHistoricalIndex = Number(historicalIndex);
  const historicalEvent = getHistoricalEvents(intDay, intMonth)[
    intHistoricalIndex
  ];
  const calendarDate = new CalendarDate(intDay, intMonth);

  return (
    <View className="flex-1 bg-brown-50 px-5 pt-5">
      <Text className="font-sans-semibold text-[28px] leading-9 text-brown-800">
        {historicalEvent.title}
      </Text>

      <Text className="mt-3 font-sans text-sm leading-5 text-brown-600">
        {historicalEvent.year} — {historicalEvent.gregorian}
      </Text>
      <Text className="font-sans text-sm leading-5 text-brown-600">
        {calendarDate.hijrahDate.day} {calendarDate.hijrahDate.monthEnStr}{" "}
        {calendarDate.hijrahDate.year}
      </Text>

      <View className="mb-7 mt-4 h-px bg-brown-200" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <Text className="font-sans text-base leading-7 text-brown-800">
          {historicalEvent.description}
        </Text>
      </ScrollView>
    </View>
  );
}
