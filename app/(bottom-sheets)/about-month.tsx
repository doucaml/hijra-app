import { Months, useDate } from "@/utils";
import { ScrollView, Text, View } from "react-native";

export default function AboutMonthScreen() {
  const { hijrahDate } = useDate();
  const month = Months[hijrahDate.month];

  return (
    <ScrollView className="flex-1">
      <View className="w-full gap-y-6 px-5 pb-8 pt-5">
        <View className="h-1 w-10 self-center rounded-full" />

        <View className="gap-y-2">
          <Text
            accessibilityRole="header"
            className="font-sans-semibold text-2xl"
          >
            About {hijrahDate.monthEnStr}
          </Text>
          <Text className="font-sans text-sm">
            Hijri month {hijrahDate.month} · {hijrahDate.year} AH
          </Text>
        </View>

        <View className="gap-y-4 rounded-2xl border border-hijra-border p-5">
          <Text className="font-sans-semibold text-xs">Month overview</Text>

          <Text className="font-sans text-lg">{month?.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
