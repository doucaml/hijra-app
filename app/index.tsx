import { useDate, todayDate, daysInitials, getMonthTable, getEvents } from "@/utils";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft, ChevronRight, Info } from "lucide-react-native";


export default function CalendarScreen() {
  const { hijrahDate, gregorianDate, monthProps, setDate } = useDate()

  const events = getEvents()
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
    <View>
      <View className="flex-row justify-end items-center m-2">
        <Pressable
          onPress={ onTodayDate }
        >
          <Text className="border-2 rounded-lg px-1 text-center font-bold">{todayDate.day}</Text>
        </Pressable>
      </View>

      <View className="m-2 flex-row items-center justify-between">
        <Pressable
          className="size-12 rounded-md justify-center items-center bg-white"
          onPress={ onPreviousMonth }
        >
          <ChevronLeft size={32} />
        </Pressable>

        <View className="w-1/2 h-12 gap-2 justify-center flex-row">
            <View className="w-3/4 h-auto bg-white rounded-md">
              <Text className="text-center my-auto text-lg">
                {hijrahDate.monthEnStr}
              </Text>
            </View>

          <View className="h-auto w-24 bg-white rounded-md">
            <Text className="text-center my-auto text-lg">
              {hijrahDate.year} AH
            </Text>
          </View>
        </View>

        <Pressable
          onPress={ onNextMonth }
          className="size-12 rounded-md justify-center items-center bg-white"
        >
          <ChevronRight size={32} />
        </Pressable>
      </View>

      <View className="bg-white mt-4 p-2">
        <View className="flex-row justify-between px-2">
          {
            daysInitials.map((day, key) => (
              <Text className="w-12 text-center" key={key}>
                { day }
              </Text>
            ))
          }
        </View>

        <View className="w-full flex-col gap-y-2 p-2">
          {
            calendarTable.map((row, key) =>
            (
              <View className="flex-row justify-between" key={key}>
                {
                  row.map((col, key) => (
                    <Pressable
                      key={key}
                      className="size-12 rounded-xl items-center justify-center"
                      onPress={() => col !== null && setDate(col, hijrahDate.month, hijrahDate.year)}
                    >
                      {
                        hijrahDate.day !== col ?
                        <View className="relative size-2/3 items-center justify-center">
                          <Text className="text-center my-auto p-2">{col}</Text>
                        </View>
                          :
                        <View className="relative size-2/3 items-center justify-center rounded-full bg-cyan-500">
                          <Text className="text-white">{col}</Text>
                        </View>
                      }
                    </Pressable>
                  )
                )}
              </View>
            ))}
        </View>
      </View>

      <Text className="bg-amber-300 text-end">About this month</Text>

      <View className="bg-white my-2 p-4 gap-y-4">
        <View className="gap-2">
          <Text className="text-2xl">{hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year}</Text>
          <Text>{gregorianDate.day} {gregorianDate.monthEnStr} {gregorianDate.year}</Text>
        </View>

        <View>
          {
            events[hijrahDate.month]?.[hijrahDate.day] !== undefined &&
            <Text className="my-2"> - { events[hijrahDate.month]?.[hijrahDate.day] }</Text>
          }
        </View>
      </View>
    </View>
  );
}
