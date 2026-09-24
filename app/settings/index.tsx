import ScreenLink from "@/components/ScreenLink";
import SwitchBtn from "@/components/SwitchBtn";
import {
  dismissAllNotifications,
  isNotificationEnabled,
  registerNotifications,
  requestNotificationPermission,
} from "@/utils/notifications";
import { ExternalPathString, router } from "expo-router";
import { ArrowLeftIcon, Bell } from "lucide-react-native";
import { useCallback, useEffect, type ReactNode } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv";

const WEBSITE_PAGE = process.env.EXPO_PUBLIC_WEBSITE_URL;
const PRIVACY_PAGE = `${WEBSITE_PAGE}/privacy-policy` as ExternalPathString;
const TERMS_PAGE = `${WEBSITE_PAGE}/terms-of-use` as ExternalPathString;

export const useNotifications = () => {
  const [notificationsActivated, setNotificationsActivation] = useMMKVBoolean(
    "preferences.notifications",
  );

  const auditNotificationValue = useCallback(async () => {
    const granted = await isNotificationEnabled();
    if (!granted || !notificationsActivated) setNotificationsActivation(false);
  }, [notificationsActivated, setNotificationsActivation]);

  useEffect(() => {
    auditNotificationValue();
  }, [auditNotificationValue]);

  const enableNotifications = async () => {
    const granted = await isNotificationEnabled();

    if (granted) {
      await registerNotifications();
      setNotificationsActivation(true);
    } else {
      const grantedAfterRequest = await requestNotificationPermission();

      if (grantedAfterRequest) {
        await registerNotifications();
        setNotificationsActivation(true);
      }
    }
  };

  const toggleNotificationsActivation = () => {
    setNotificationsActivation((prev) => {
      if (prev) {
        dismissAllNotifications();
        return false;
      } else enableNotifications();
    });
  };

  return {
    notificationsEnabled: notificationsActivated,
    toggleNotificationsActivation,
  };
};

export default function Screen() {
  const { notificationsEnabled, toggleNotificationsActivation } =
    useNotifications();
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
          Settings
        </Text>
      </View>

      <SettingsSection title="Preferences">
        <View className="rounded-2xl bg-brown-50 px-4 py-3">
          <View className="flex-row items-center">
            <View className="mr-3 size-10 items-center justify-center rounded-full bg-brown-100">
              <Bell size={19} color="#9E5F33" />
            </View>

            <View className="flex-1 pr-3">
              <Text className="font-sans-semibold text-base text-brown-800">
                Allow notifications
              </Text>
              <Text className="mt-1 font-sans text-xs leading-4 text-brown-600">
                Receive reminders for important dates and practices
              </Text>
            </View>

            <SwitchBtn
              value={notificationsEnabled ?? false}
              onChange={toggleNotificationsActivation}
            />
          </View>
        </View>
      </SettingsSection>

      <SettingsSection title="Legal">
        <View className="rounded-2xl bg-brown-50 p-2">
          <ScreenLink href={PRIVACY_PAGE} title="Privacy policy" />
          <View className="h-0.5 bg-brown-100" />
          <ScreenLink href={TERMS_PAGE} title="Terms of use" />
        </View>
      </SettingsSection>

      <SettingsSection title="About">
        <View className="rounded-2xl bg-brown-50 p-2">
          <ScreenLink href="/settings/about" title="About Hijra" />
          <View className="h-0.5 bg-brown-100" />
          <ScreenLink href="/settings/contact" title="Contact" />
        </View>
      </SettingsSection>

      <Text className="mt-8 text-center font-sans text-xs text-brown-400">
        Hijra · Version 1.0.0
      </Text>
    </ScrollView>
  );
}

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View className="mb-7">
      <Text className="mb-3 font-sans-semibold text-xs uppercase tracking-[1.5px] text-brown-600">
        {title}
      </Text>
      {children}
    </View>
  );
}
