import {
  useCalendarDate,
  getTodayHijraDate,
  getMonthTable,
  daysInitials,
  todayGregorianDate,
  Celebrations as Celebrations,
  CalendarDate,
} from "@/utils/dates";
import {
  getCalendarEvent,
  getHistoricalEvents,
  getRecommendedPractices,
} from "@/utils/calendarEvents";
import { ScrollView, View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight, SettingsIcon } from "lucide-react-native";
import { Link } from "expo-router";
import {
  isNotificationEnabled,
  registerNotifications,
  useNotificationResponse,
} from "@/utils/notifications";
import { useEffect, useMemo } from "react";
import { createMMKV } from "react-native-mmkv";

let notificationsRegisteringDone = false;
const preferences = createMMKV();

const setNotificationRegistration = async () => {
  const granted = await isNotificationEnabled();
  const notificationsEnabled = preferences.getBoolean("preferences.notifications");

  if (granted && notificationsEnabled && !notificationsRegisteringDone) {
    await registerNotifications();
    notificationsRegisteringDone = true;
  }
};

export default function CalendarScreen() {
  const todayDate = useMemo(() => new CalendarDate(), []);

  useEffect(() => {
    setNotificationRegistration();
  }, []);

  useNotificationResponse();

  const { hijrahDate, gregorianDate, monthProps, editDate } = useCalendarDate();

  useEffect(() => {
    editDate(
      todayDate.hijrahDate.day,
      todayDate.hijrahDate.month,
      todayDate.hijrahDate.year,
    );
  }, [todayDate, editDate]);

  const calendarTable = useMemo(
    () => getMonthTable(monthProps.firstDayWeekPosition, monthProps.length),
    [monthProps.firstDayWeekPosition, monthProps.length],
  );

  const calendarTableWithEvents = useMemo(
    () =>
      calendarTable.map((row) =>
        row.map((day) =>
          day === null
            ? null
            : {
                day,
                event: getCalendarEvent(day, hijrahDate.month),
              },
        ),
      ),
    [calendarTable, hijrahDate.month],
  );

  const celebrationsList = Celebrations[hijrahDate.month]?.[hijrahDate.day];
  const recommendedPractices = getRecommendedPractices(
    hijrahDate.day,
    hijrahDate.month,
    hijrahDate.year,
  );
  const historicalEvents = getHistoricalEvents(
    hijrahDate.day,
    hijrahDate.month,
  );

  const eventBackgroundClasses = {
    celebration: "bg-yellow-200",
    historical: "bg-blue-200",
  } as const;

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
    <View className="my-2 flex-1 gap-y-2">
      <View className="mx-5 flex-row items-center justify-between">
        <Link href="/settings" asChild>
          <Pressable
            accessibilityLabel="settings-button"
            testID="settings-button"
          >
            <SettingsIcon />
          </Pressable>
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

        <View className="flex-col gap-2">
          {calendarTableWithEvents.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-between">
              {row.map((calendarDay, columnIndex) =>
                calendarDay !== null ? (
                  <View
                    key={columnIndex}
                    className={`w-10 items-center border-2 rounded-xl ${
                      calendarDay.day === hijrahDate.day
                        ? "border-gray-500"
                        : "border-white"
                    } ${
                      calendarDay.event
                        ? eventBackgroundClasses[calendarDay.event.type]
                        : "bg-transparent"
                    }`}
                  >
                    <Pressable
                      className="size-8 justify-center items-center"
                      onPress={() =>
                        editDate(
                          calendarDay.day,
                          hijrahDate.month,
                          hijrahDate.year,
                        )
                      }
                    >
                      <Text>{calendarDay.day}</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View key={columnIndex} className="w-10 h-8" />
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

        <ScrollView
          className="flex-1"
          contentContainerClassName="mt-4 p-2 pb-8 gap-y-4"
          showsVerticalScrollIndicator={false}
        >
          {recommendedPractices.map((practice) => (
            <Link
              href={`/events/reccurent/${practice.key}`}
              key={practice.key}
              className="px-2 py-4 rounded-xl bg-brown-100"
            >
              <Text className="text-base font-bold text-brown-700">
                {practice.title}
              </Text>
            </Link>
          ))}

          {celebrationsList !== undefined &&
            celebrationsList.map((celebration, key) => (
              <Link
                href={`/events/celebration?celebrationIndex=${key}&month=${hijrahDate.month}&day=${hijrahDate.day}`}
                key={key}
                className="px-2 py-4 rounded-xl bg-brown-100"
              >
                <Text className="text-base font-bold text-brown-700">
                  {celebration.title}
                </Text>
              </Link>
            ))}

          {historicalEvents.map((historicalEvent, key) => (
            <Link
              href={{
                pathname: "/events/historical/[uri]",
                params: {
                  uri: "event",
                  historicalIndex: String(key),
                  month: String(hijrahDate.month),
                  day: String(hijrahDate.day),
                },
              }}
              key={`${historicalEvent.title}-${key}`}
              className="px-2 py-4 rounded-xl bg-blue-100"
            >
              <Text className="text-base font-bold text-blue-800">
                {historicalEvent.title}
              </Text>
            </Link>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
