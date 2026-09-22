import ScreenLink from "@/components/ScreenLink";
import SwitchBtn from "@/components/SwitchBtn";
import {
  dismissAllNotifications,
  isNotificationEnabled,
  registerReccurentNotifications,
  requestNotificationPermission
} from "@/utils/notifications";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useMMKVBoolean } from "react-native-mmkv"

export const useNotifications = () => {
  const [notificationsActivated, setNotificationsActivation] = useMMKVBoolean("preferences.notifications")

  const auditNotificationValue = async () => {
    const granted = await isNotificationEnabled();
    if (notificationsActivated && !granted) setNotificationsActivation(false);
  };

  useEffect(() => {
    auditNotificationValue();
  }, []);

  const enableNotifications = async () => {
    const granted = await isNotificationEnabled();

    if (granted)
      setNotificationsActivation(true);

    else {
      const grantedAfterRequest = await requestNotificationPermission()

      if (grantedAfterRequest) {
        registerReccurentNotifications()
        setNotificationsActivation(true)
      }
    }
  }

  const toggleNotificationsActivation = () => {
    setNotificationsActivation(prev => {
      if (prev) {
        dismissAllNotifications()
        return false
      }

      else enableNotifications()
    })
  }

  return { notificationsEnabled: notificationsActivated, toggleNotificationsActivation }
}

export default function Screen() {
  const { notificationsEnabled, toggleNotificationsActivation } = useNotifications()
  return (
    <View className="flex-1 gap-y-6 relative">
      <View className="flex-row items-center">
        <Pressable className="absolute z-10" onPress={() => router.back()}>
          <ArrowLeftIcon />
        </Pressable>

        <Text className="text-center font-bold text-xl flex-1">Settings</Text>
      </View>

      <View>
        <Text className="text-lg text-gray-700">Preferences</Text>

        <View className="flex-row items-center justify-between p-2 my-1 h-12 rounded-lg bg-gray-200">
          <Text>Allow notifications</Text>
          <SwitchBtn
            value={notificationsEnabled ?? false}
            onChange={toggleNotificationsActivation}
          />
        </View>
      </View>

      <View>
        <Text className="text-lg text-gray-700">About</Text>

        <ScreenLink href="/settings/about" title="About me" />
        <ScreenLink href="/settings/contact" title="Contact" />
      </View>

      <View className="mt-auto mx-auto">
        <Text>Version: 1.0.0</Text>
      </View>
    </View>
  );
}
