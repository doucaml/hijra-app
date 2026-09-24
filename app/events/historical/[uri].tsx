import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
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
    <View className="flex-1 gap-y-4 p-4">
      <View className="gap-y-2">
        <Text className="text-xl text-center font-bold text-blue-800">
          {historicalEvent.title}
        </Text>

        <Text className="text-gray-700 font-light">
          {historicalEvent.year} - {historicalEvent.gregorian}
        </Text>

        <Text className="text-gray-700 font-light">
          {calendarDate.hijrahDate.day} {calendarDate.hijrahDate.monthEnStr}{" "}
          {calendarDate.hijrahDate.year}
        </Text>
      </View>

      <Text className="font-light text-[17px]">
        {historicalEvent.description}
      </Text>
    </View>
  );
}
