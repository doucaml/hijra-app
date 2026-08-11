import { useDate, todayDate, daysInitials, getMonthTable, Events } from "@/utils";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";


export default function CalendarScreen() {
  const { hijrahDate, gregorianDate, monthProps, setDate } = useDate()

  const calendarTable = getMonthTable(monthProps.firstDayWeekPosition, monthProps.length)

  const onPreviousMonth = () => {
    const hijrahMonth = hijrahDate.month === 1 ? 12 : hijrahDate.month - 1
    const hijrahYear = hijrahDate.month === 1 ? hijrahDate.year - 1 : hijrahDate.year

    setDate(1, hijrahMonth, hijrahYear)
  }

  const onNextMonth = () => {
    const hijrahMonth = hijrahDate.month === 12 ? 1 : hijrahDate.month + 1
    const hijrahYear = hijrahDate.month === 12 ? hijrahDate.year + 1 : hijrahDate.year

    setDate(1, hijrahMonth, hijrahYear)
  }

  const onTodayDate = () =>
    setDate(todayDate.day, todayDate.month, todayDate.year)

  return (
    <LinearGradient
      colors={["#C7E0E4", "#EDF0E9", "#FAF8F3"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="px-5 pt-3 pb-4 gap-y-4">
        <Pressable
          className="self-end"
          onPress={ onTodayDate }
        >
          <Text className="rounded-full border-2 border-hijra-action px-3 py-2 text-center font-sans-semibold text-sm text-hijra-action">{todayDate.day}</Text>
        </Pressable>

      <View className="flex-row items-center justify-between gap-x-3">
        <Pressable
          className="h-11 w-11 items-center justify-center rounded-xl border border-hijra-border bg-hijra-surface"
          onPress={ onPreviousMonth }
        >
          <ChevronLeft size={32} />
        </Pressable>

        <View className="flex-1 flex-row items-center justify-center gap-x-2">
          <View className="h-11 flex-1 justify-center rounded-xl border border-hijra-border bg-hijra-surface px-3">
            <Text className="text-center font-sans-medium text-base text-hijra-text">
              {hijrahDate.monthEnStr}
            </Text>
          </View>

          <View className="h-11 justify-center rounded-xl border border-hijra-border bg-hijra-surface px-3">
            <Text className="text-center font-sans-medium text-base text-hijra-text-secondary">
              {hijrahDate.year} AH
            </Text>
          </View>
        </View>

        <Pressable
          onPress={ onNextMonth }
          className="h-11 w-11 items-center justify-center rounded-xl border border-hijra-border bg-hijra-surface"
        >
          <ChevronRight size={32} />
        </Pressable>
      </View>

      <View className="items-end pb-1">
        <Link href={"/about-month"} className="rounded-full border border-hijra-border bg-hijra-surface-secondary px-4 py-2">
          <Text className="text-end font-sans-medium text-sm text-hijra-action">About { hijrahDate.monthEnStr }</Text>
        </Link>
      </View>
      </View>

      <View className="mx-4 mt-4 rounded-2xl border border-hijra-border bg-hijra-surface px-2 pt-4 pb-3">
        <View className="flex-row px-1 pb-2">
          {
            daysInitials.map((day, key) => (
              <Text className="flex-1 text-center font-sans-semibold text-xs text-hijra-text-secondary" key={key}>
                { day }
              </Text>
            ))
          }
        </View>

        <View className="w-full flex-col gap-y-1 px-1">
          {
            calendarTable.map((row, key) =>
            (
              <View className="flex-row justify-between" key={key}>
                {
                  row.map((col, key) => (
                    <Pressable
                      key={key}
                      className="h-12 flex-1 items-center justify-center rounded-xl"
                      onPress={() => col !== null && setDate(col, hijrahDate.month, hijrahDate.year)}
                    >
                      {
                        hijrahDate.day !== col ?
                          <>
                            {
                              Events[hijrahDate.month]?.[col] === undefined ?
                              <View className="h-9 w-9 items-center justify-center rounded-full">
                                <Text className="text-center font-sans-medium text-base text-hijra-text">{col}</Text>
                              </View>
                                :
                              <View className="h-9 w-9 items-center justify-center rounded-xl bg-hijra-event">
                                <Text className="font-sans-semibold text-base text-hijra-event-text">{col}</Text>
                              </View>
                            }
                          </>
                          :
                          <View className="h-9 w-9 items-center justify-center rounded-full bg-hijra-today">
                            <Text className="font-sans-semibold text-base text-white">{col}</Text>
                          </View>
                      }
                    </Pressable>
                  )
                )}
              </View>
            ))}
        </View>
      </View>

      <View className="h-2/7 mx-4 mt-3 gap-y-4 rounded-2xl border border-hijra-border bg-hijra-surface p-5">
        <View className="gap-y-1">
          <Text className="font-sans-semibold text-[22px] leading-7 text-hijra-text">{hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} AH</Text>
          <Text className="font-sans text-[15px] leading-5 text-hijra-text-secondary">{gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}</Text>
        </View>

        <View>
          {
            Events[hijrahDate.month]?.[hijrahDate.day] !== undefined &&
            <Link href="/holiday" className="p-2 rounded-xl border-hijra-today bg-hijra-event">
              <Text className="font-sans-medium text-base text-hijra-event-text">{Events[hijrahDate.month]?.[hijrahDate.day].title}</Text>
            </Link>
          }
        </View>
      </View>
    </LinearGradient>
  );
}
