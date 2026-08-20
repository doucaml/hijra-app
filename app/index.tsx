import {
  useDate,
  todayHijraDate,
  getMonthTable,
  daysInitials,
  todayGregorianDate,
  Events,
} from "@/utils";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";

export default function CalendarScreen() {
  const { hijrahDate, gregorianDate, monthProps, setDate } = useDate();
  const calendarTable = getMonthTable(
    monthProps.firstDayWeekPosition,
    monthProps.length,
  );

  const holidays = Events;

  const onPreviousMonth = () => {
    const hijrahMonth = hijrahDate.month === 1 ? 12 : hijrahDate.month - 1;
    const hijrahYear =
      hijrahDate.month === 1 ? hijrahDate.year - 1 : hijrahDate.year;

    setDate(1, hijrahMonth, hijrahYear);
  };

  const onNextMonth = () => {
    const hijrahMonth = hijrahDate.month === 12 ? 1 : hijrahDate.month + 1;
    const hijrahYear =
      hijrahDate.month === 12 ? hijrahDate.year + 1 : hijrahDate.year;

    setDate(1, hijrahMonth, hijrahYear);
  };

  const onTodayDate = () =>
    setDate(todayHijraDate.day, todayHijraDate.month, todayHijraDate.year);

  return (
    <View className="my-2 flex-1 gap-y-3">
      <View className="mx-5 flex-row items-center justify-between">
        <Pressable
          className="ml-auto size-7 border-[1.8px] rounded-[10px] border-brown-700 justify-center items-center"
          onPress={onTodayDate}
        >
          <Text className="text-center align-middle text-brown-600 font-bold">
            {todayHijraDate.day}
          </Text>
        </Pressable>
      </View>
      <View className="flex-row justify-between items-center mx-4">
        <Pressable
          onPress={onPreviousMonth}
          className="p-2 rounded-full shadow ring ring-gray-200"
        >
          <ChevronLeft />
        </Pressable>

        <Text className="font-semibold text-lg px-4 py-2">
          {hijrahDate.monthEnStr.toUpperCase()}{" "}
          {hijrahDate.year !== todayHijraDate.year && hijrahDate.year}
        </Text>

        <Pressable
          onPress={onNextMonth}
          className="p-2 rounded-full shadow ring ring-gray-200"
        >
          <ChevronRight />
        </Pressable>
      </View>

      <View className="mx-5">
        <View className="flex-row justify-between">
          {daysInitials.map((initial, key) => (
            <View key={key} className="w-8 h-6">
              <Text className="text-center text-xs text-gray-600">
                {initial}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-col gap-1">
          {calendarTable.map((row, key) => (
            <View key={key} className="flex-row justify-between">
              {row.map((col, key) =>
                col !== null ? (
                  <Pressable
                    key={key}
                    className="size-8 justify-center items-center"
                    onPress={() =>
                      setDate(col, hijrahDate.month, hijrahDate.year)
                    }
                  >
                    {hijrahDate.day === col ? (
                      <Text
                        className={
                          holidays[hijrahDate.month]?.[col] !== undefined
                            ? "text-center align-middle size-7 rounded-xl border-[1.8px] text-brown-700 bg-brown-100 border-brown-500"
                            : "text-center align-middle size-7 rounded-xl border-[1.8px] border-brown-500"
                        }
                      >
                        {col}
                      </Text>
                    ) : (
                      <Text
                        className={
                          holidays[hijrahDate.month]?.[col] !== undefined
                            ? "text-center align-middle size-7 rounded-xl bg-brown-100 text-brown-700"
                            : "text-center align-middle size-7"
                        }
                      >
                        {col}
                      </Text>
                    )}
                  </Pressable>
                ) : (
                  <View key={key} className="size-8" />
                ),
              )}
            </View>
          ))}
        </View>
      </View>

      <View className="flex-1 p-2">
        <View className="px-4">
          <Text className="font-semibold text-xl">
            {hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year}
          </Text>

          <Text className="text-gray-500">
            {gregorianDate.day} {gregorianDate.monthEnStr}{" "}
            {todayGregorianDate.year !== gregorianDate.year &&
              gregorianDate.year}
          </Text>
        </View>

        <View className="mt-4 p-2">
          {holidays[hijrahDate.month]?.[hijrahDate.day] !== undefined && (
            <Link href="/holiday" className="px-2 py-4 rounded-xl bg-brown-100">
              <Text className="text-base font-bold text-brown-700">
                {holidays[hijrahDate.month][hijrahDate.day].title}
              </Text>
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
