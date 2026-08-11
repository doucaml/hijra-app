import { Months, useDate } from "@/utils";
import { ScrollView, Text, View } from "react-native";

export default function AboutMonthScreen() {
  const { hijrahDate } = useDate()
  const month = Months[hijrahDate.month]

  return (
    <ScrollView className="flex-1 bg-hijra-canvas">
      <View className="w-full gap-y-6 px-5 pb-8 pt-5">
        <View className="h-1 w-10 self-center rounded-full bg-hijra-border" />

        <View className="gap-y-2">
          <Text
            accessibilityRole="header"
            className="font-sans-semibold text-2xl leading-8 text-hijra-text"
          >
            About {hijrahDate.monthEnStr}
          </Text>
          <Text className="font-sans text-sm leading-5 text-hijra-text-secondary">
            Hijri month {hijrahDate.month} · {hijrahDate.year} AH
          </Text>
        </View>

        <View className="gap-y-4 rounded-2xl border border-hijra-border bg-hijra-surface p-5">
          <Text className="font-sans-semibold text-xs leading-4 text-hijra-text-secondary">
            Month overview
          </Text>

          <Text className="font-sans text-[17px] leading-6 text-hijra-text">
            {month?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
