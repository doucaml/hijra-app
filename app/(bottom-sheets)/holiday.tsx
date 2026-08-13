import { Events, useDate } from "@/utils";
import { ScrollView, Text, View } from "react-native";

export default function HolidayScreen() {
  const { hijrahDate, gregorianDate } = useDate();
  const event = Events[hijrahDate.month]?.[hijrahDate.day];

  return (
    <ScrollView className="flex-1">
      <View className="w-full gap-y-6 px-5 pb-8 pt-5">
        <View className="gap-y-4">
          <View className="h-1 w-10 self-center rounded-full" />

          <View className="pt-1">
            <View className="gap-y-1">
              <Text
                accessibilityRole="header"
                className="font-sans-semibold text-2xl"
              >
                {event.title}
              </Text>
              <Text className="font-sans text-sm">
                {hijrahDate.day} {hijrahDate.monthEnStr} {hijrahDate.year} AH ·{" "}
                {gregorianDate.day} {gregorianDate.monthEnStr}{" "}
                {gregorianDate.year}
              </Text>
            </View>
          </View>
        </View>

        <View className="rounded-2xl border p-4">
          <Text className="font-sans">{event.description}</Text>
        </View>

        {event.actions?.duty !== undefined && (
          <View className="gap-y-3">
            <View>
              <Text
                accessibilityRole="header"
                className="font-sans-semibold text-xl"
              >
                Duties
              </Text>
            </View>

            <View className="gap-y-3 rounded-2xl border p-4">
              {event.actions.duty.map((value, key) => (
                <View key={key}>
                  <Text className="font-sans text-base">{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {event.actions?.recommended !== undefined && (
          <View className="gap-y-3">
            <View>
              <Text
                accessibilityRole="header"
                className="font-sans-semibold text-xl"
              >
                Recommended
              </Text>
            </View>

            <View className="gap-y-3 rounded-2xl border p-4">
              {event.actions.recommended.map((value, key) => (
                <View key={key}>
                  <Text className="font-sans text-base">{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
