import { router } from "expo-router";
import { ArrowLeftIcon, Bug, ExternalLink, Mail } from "lucide-react-native";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

const WEBSITE_URL =
  process.env.EXPO_PUBLIC_WEBSITE_URL ?? "https://doucaml.github.io/hijra-app/";
const EMAIL = "mohamedoucoure5@gmail.com";
const GITHUB_URL = "https://github.com/doucaml/hijra-app/issues";

export default function Screen() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

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
          Contact
        </Text>
      </View>

      <Text className="mb-2 font-sans-semibold text-xl text-brown-800">
        We would love to hear from you
      </Text>
      <Text className="mb-7 font-sans text-sm leading-6 text-brown-600">
        Found a bug, have a suggestion, or noticed an incorrect date? Get in
        touch and help us improve Hijra.
      </Text>

      <ContactAction
        icon={<Mail size={20} color="#9E5F33" />}
        title="Send us an email"
        description={EMAIL}
        onPress={() => openLink(`mailto:${EMAIL}`)}
      />
      <ContactAction
        icon={<Bug size={20} color="#9E5F33" />}
        title="Report an issue"
        description="Open a GitHub issue"
        onPress={() => openLink(GITHUB_URL)}
      />
      <ContactAction
        icon={<ExternalLink size={20} color="#9E5F33" />}
        title="Visit the website"
        description="Read the latest information about Hijra"
        onPress={() => openLink(WEBSITE_URL)}
      />

      <View className="mt-5 rounded-2xl bg-brown-50 p-4">
        <Text className="font-sans-semibold text-base text-brown-800">
          When reporting a problem
        </Text>
        <Text className="mt-2 font-sans text-sm leading-6 text-brown-600">
          Please include your device model, Android version, app version, and a
          short description of what happened.
        </Text>
      </View>
    </ScrollView>
  );
}

function ContactAction({
  icon,
  title,
  description,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="mb-3 flex-row items-center rounded-2xl bg-brown-50 p-4"
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
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
      <ExternalLink size={18} color="#CB8655" />
    </Pressable>
  );
}
