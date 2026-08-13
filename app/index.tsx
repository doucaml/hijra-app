import {
  useDate,
  todayDate,
  daysInitials,
  getMonthTable,
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
    setDate(todayDate.day, todayDate.month, todayDate.year);

  return (
    <View>
      <View className="px-5 my-2 gap-y-2">
        <Pressable className="self-end" onPress={onTodayDate}>
          <Text className="rounded-full border-2 px-3 py-2 text-center font-sans-semibold text-sm">
            {todayDate.day}
          </Text>
        </Pressable>

        <View className="flex-row items-center justify-between gap-x-3">
          <Pressable
            className="h-11 w-11 items-center justify-center rounded-xl border"
            onPress={onPreviousMonth}
          >
            <ChevronLeft size={32} />
          </Pressable>

          <View className="flex-1 flex-row items-center justify-center gap-x-2">
            <View className="h-11 flex-1 justify-center rounded-xl border px-3">
              <Text className="text-center font-sans-medium text-base">
                {hijrahDate.monthEnStr}
              </Text>
            </View>

            <View className="h-11 justify-center rounded-xl border px-3">
              <Text className="text-center font-sans-medium">
                {hijrahDate.year} AH
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onNextMonth}
            className="h-11 w-11 items-center justify-center rounded-xl border"
          >
            <ChevronRight size={32} />
          </Pressable>
        </View>

        <View className="items-end pb-1">
          <Link href={"/about-month"} className="rounded-full px-4 py-2">
            <Text className="text-end font-sans-medium text-sm">
              About {hijrahDate.monthEnStr}
            </Text>
          </Link>
        </View>
      </View>

      <View className="mx-4 mt-4 rounded-2xl border px-2 pt-4 pb-3">
        <View className="flex-row px-1 pb-2">
          {daysInitials.map((day, key) => (
            <Text className="flex-1 text-center font-sans-semibold" key={key}>
              {day}
            </Text>
          ))}
        </View>

        <View className="w-full flex-col gap-y-1 px-1">
          {calendarTable.map((row, key) => (
            <View className="flex-row justify-between" key={key}>
              {row.map((col, key) => (
                <Pressable
                  key={key}
                  className="h-12 flex-1 items-center justify-center rounded-xl"
                  onPress={() =>
                    col !== null &&
                    setDate(col, hijrahDate.month, hijrahDate.year)
                  }
                >
                  {hijrahDate.day !== col ? (
                    <>
                      {Events[hijrahDate.month]?.[col] === undefined ? (
                        <View className="h-9 w-9 items-center justify-center rounded-full">
                          <Text className="text-center font-sans-medium text-base">
                            {col}
                          </Text>
                        </View>
                      ) : (
                        <View className="h-9 w-9 items-center justify-center rounded-xl">
                          <Text className="font-sans-semibold text-base-text">
                            {col}
                          </Text>
                        </View>
                      )}
                    </>
                  ) : (
                    <View className="h-9 w-9 items-center justify-center rounded-full">
                      <Text className="font-sans-semibold text-base text-white">
                        {col}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View className="h-36 mx-4 mt-2 gap-y-4 rounded-2xl border p-5">
        <View className="gap-y-1">
          <Text className="font-sans-semibold">
            {hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} AH
          </Text>
          <Text>
            {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
          </Text>
        </View>

        <View>
          {Events[hijrahDate.month]?.[hijrahDate.day] !== undefined && (
            <Link href="/holiday" className="p-2 rounded-xl">
              <Text className="font-sans-medium">
                {Events[hijrahDate.month]?.[hijrahDate.day].title}
              </Text>
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
