import Constants from "expo-constants";
import { router } from "expo-router";
import { ArrowLeftIcon, CalendarDays, Bell, Smartphone } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

const APP_VERSION = Constants.expoConfig?.version ?? "Unknown";

export default function Screen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="px-5 pb-8 pt-3"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8 flex-row items-center">
        <Pressable
          className="-ml-2 size-10 items-center justify-center"
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={22} color="#432917" />
        </Pressable>
        <Text className="ml-2 font-sans-semibold text-[28px] leading-9 text-brown-800">
          About Hijra
        </Text>
      </View>

      <View className="mb-7 items-center rounded-2xl bg-brown-50 px-5 py-7">
        <Text className="font-oleo-script-bold text-4xl text-brown-800">
          Hijra
        </Text>
        <Text className="mt-2 text-center font-sans text-sm leading-5 text-brown-600">
          Your companion for exploring the Hijri calendar and important Islamic
          dates.
        </Text>
      </View>

      <Section title="What you can do with Hijra">
        <Feature
          icon={<CalendarDays size={20} color="#9E5F33" />}
          title="Explore the calendar"
          description="View Hijri and Gregorian dates side by side."
        />
        <Feature
          icon={<Bell size={20} color="#9E5F33" />}
          title="Stay informed"
          description="Receive optional reminders for important dates and practices."
        />
        <Feature
          icon={<Smartphone size={20} color="#9E5F33" />}
          title="Keep it close"
          description="Use the app and its widgets to quickly check the current date."
        />
      </Section>

      <Section title="About the dates">
        <Text className="font-sans text-sm leading-6 text-brown-700">
          Hijri dates are calculated and may differ from dates based on local
          moon sightings or another calculation method. Please use Hijra as a
          helpful reference and check with your local community for religious
          observances.
        </Text>
      </Section>

      <Text className="mt-4 text-center font-sans text-xs text-brown-400">
        Hijra · Version {APP_VERSION}
      </Text>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="mb-7">
      <Text className="mb-3 font-sans-semibold text-xs uppercase tracking-[1.5px] text-brown-600">
        {title}
      </Text>
      {children}
    </View>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View className="mb-4 flex-row items-center rounded-2xl bg-brown-50 p-4 last:mb-0">
      <View className="mr-3 size-10 items-center justify-center rounded-full bg-brown-100">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="font-sans-semibold text-base text-brown-800">
          {title}
        </Text>
        <Text className="mt-1 font-sans text-sm leading-5 text-brown-600">
          {description}
        </Text>
      </View>
    </View>
  );
}
