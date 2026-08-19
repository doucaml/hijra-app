import { useDate, todayDate, getMonthTable, daysInitials } from "@/utils";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

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
    <View className="my-2 flex-1 gap-y-6">
      <View className="flex-row justify-between items-center mx-4">
        <Pressable
          onPress={onPreviousMonth}
          className="p-2 rounded-full shadow ring ring-gray-200"
        >
          <ChevronLeft />
        </Pressable>

        <Text className="font-semibold text-lg px-4 py-2">
          {hijrahDate.monthEnStr.toUpperCase()}{" "}
          {hijrahDate.year !== todayDate.year && hijrahDate.year}
        </Text>

        <Pressable
          onPress={onNextMonth}
          className="p-2 rounded-full shadow ring ring-gray-200"
        >
          <ChevronRight />
        </Pressable>
      </View>

      <View>
        <View className="w-full flex-row justify-between">
          {daysInitials.map((initial, key) => (
            <View key={key} className="w-12 h-6">
              <Text className="text-center text-gray-600">{initial}</Text>
            </View>
          ))}
        </View>

        <View className="w-full flex-col gap-1">
          {calendarTable.map((row, key) => (
            <View key={key} className="flex-row justify-between">
              {row.map((col, key) => (
                <Pressable
                  key={key}
                  className="size-12 justify-center items-center"
                  onPress={() =>
                    setDate(col, hijrahDate.month, hijrahDate.year)
                  }
                >
                  {col !== null &&
                    (hijrahDate.day !== col ? (
                      <View className="size-12 justify-center items-center">
                        <Text className="text-center text-base">{col}</Text>
                      </View>
                    ) : (
                      <View
                        style={{ backgroundColor: "#ede0d4" }}
                        className="size-8 justify-center items-center rounded-xl"
                      >
                        <Text
                          style={{ color: "#7f5539" }}
                          className="text-center text-base font-bold"
                        >
                          {col}
                        </Text>
                      </View>
                    ))}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>

      <View className="flex-1 p-2">
        <View>
          <Text className="font-semibold text-xl">
            {hijrahDate.day} {hijrahDate.monthEnStr}{" "}
            {hijrahDate.year !== todayDate.year && hijrahDate.year}
          </Text>

          <Text>
            {gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}
          </Text>
        </View>

        <View className="mt-4 p-2">
          <Pressable
            style={{ backgroundColor: "#ede0d4" }}
            className="px-2 py-4 rounded-xl"
          >
            <Text style={{ color: "#7f5539" }} className="text-base font-bold">
              Date of birth of the Prophet
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
