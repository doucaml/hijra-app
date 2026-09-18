import {
  useCalendarDate,
  getTodayHijraDate,
  getMonthTable,
  daysInitials,
  todayGregorianDate,
  Celebrations as Celebrations,
} from "@/dates";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight, SettingsIcon } from "lucide-react-native";
import { Link } from "expo-router";
import {
  isNotificationEnabled,
  registerReccurentNotifications,
} from "@/notifications";
import { useContext, useEffect } from "react";
import { PreferencesContext } from "@/PreferencesContext";

let notificationsRegisteringDone = false;

const setReccurentNotification = async () => {
  const granted = await isNotificationEnabled();

  if (granted && !notificationsRegisteringDone) {
    registerReccurentNotifications();
    notificationsRegisteringDone = true;
  }
};

setReccurentNotification();

export default function CalendarScreen() {
  const { adjustedTodayDate: todayDate } = useContext(PreferencesContext);

  const { hijrahDate, gregorianDate, monthProps, editDate } = useCalendarDate();

  useEffect(() => {
    editDate(
      todayDate.hijrahDate.day,
      todayDate.hijrahDate.month,
      todayDate.hijrahDate.year,
    );
  }, [todayDate, editDate]);

  const calendarTable = getMonthTable(
    monthProps.firstDayWeekPosition,
    monthProps.length,
  );

  const celebrationsList = Celebrations[hijrahDate.month]?.[hijrahDate.day];

  const onPreviousMonth = () => {
    const hijrahMonth = hijrahDate.month === 1 ? 12 : hijrahDate.month - 1;
    const hijrahYear =
      hijrahDate.month === 1 ? hijrahDate.year - 1 : hijrahDate.year;

    editDate(1, hijrahMonth, hijrahYear);
  };

  const onNextMonth = () => {
    const hijrahMonth = hijrahDate.month === 12 ? 1 : hijrahDate.month + 1;
    const hijrahYear =
      hijrahDate.month === 12 ? hijrahDate.year + 1 : hijrahDate.year;

    editDate(1, hijrahMonth, hijrahYear);
  };

  const onTodayDate = () =>
    editDate(
      getTodayHijraDate().day,
      getTodayHijraDate().month,
      getTodayHijraDate().year,
    );

  return (
    <View className="my-2 flex-1 gap-y-3">
      <View className="mx-5 flex-row items-center justify-between">
        <Link href="/settings">
          <SettingsIcon />
        </Link>
        <Pressable
          className="ml-auto size-7 border-[1.8px] rounded-[10px] border-brown-700 justify-center items-center"
          onPress={onTodayDate}
        >
          <Text className="text-center align-middle text-brown-600 font-bold">
            {todayDate.hijrahDate.day}
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
          {hijrahDate.year !== getTodayHijraDate().year && hijrahDate.year}
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
                      editDate(col, hijrahDate.month, hijrahDate.year)
                    }
                  >
                    {hijrahDate.day === col ? (
                      <Text
                        className={
                          Celebrations[hijrahDate.month]?.[col] !== undefined
                            ? "text-center align-middle size-7 rounded-xl border-[1.8px] text-brown-700 bg-brown-100 border-brown-500"
                            : "text-center align-middle size-7 rounded-xl border-[1.8px] border-brown-500"
                        }
                      >
                        {col}
                      </Text>
                    ) : (
                      <Text
                        className={
                          Celebrations[hijrahDate.month]?.[col] !== undefined
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

        <View className="mt-4 p-2 gap-y-4">
          {celebrationsList !== undefined &&
            celebrationsList.map((celebration, key) => (
              <Link
                href={`/celebration?celebrationIndex=${key}&month=${hijrahDate.month}&day=${hijrahDate.day}`}
                key={key}
                className="px-2 py-4 rounded-xl bg-brown-100"
              >
                <Text className="text-base font-bold text-brown-700">
                  {celebration.title}
                </Text>
              </Link>
            ))}
        </View>
      </View>
    </View>
  );
}
