import { Href, Link } from "expo-router";
import { View, Text, Pressable, Switch } from "react-native";
import { createMMKV, useMMKVBoolean, useMMKVNumber } from "react-native-mmkv";

const storage = createMMKV();
storage.contains("preferences.notifications") === undefined &&
  storage.set("preferences.notifications", false);
storage.getNumber("preferences.days_correction") === undefined &&
  storage.set("preferences.days_correction", 0);

const usePreferences = () => {
  const [notificationState, setNotificationState] = useMMKVBoolean(
    "preferences.notifications",
  );

  const [daysCorrection, setDaysCorrection] = useMMKVNumber(
    "preferences.days_correction",
  );

  const toggleNotificationState = () => setNotificationState((prev) => !prev);
  const editDaysCorrection = () =>
    setDaysCorrection((prev) => {
      if (prev === 2) return -2;
      else return prev! + 1;
    });
  return {
    notificationState,
    toggleNotificationState,
    daysCorrection,
    editDaysCorrection,
  };
};

function ScreenLink({ href, title }: { href: Href; title: string }) {
  return (
    <Link href={href} className="p-3 my-1 rounded-lg bg-gray-200">
      <Text>{title}</Text>
    </Link>
  );
}

export default function Screen() {
  const {
    notificationState,
    toggleNotificationState,
    daysCorrection,
    editDaysCorrection,
  } = usePreferences();

  return (
    <View className="flex-1 gap-y-6">
      <Text className="text-center font-bold text-xl">Settings</Text>

      <View>
        <Text className="text-lg text-gray-700">Preferences</Text>

        <View className="flex-row items-center justify-between p-2 my-1 h-12 rounded-lg bg-gray-200">
          <Text>Allow notifications</Text>
          <Switch
            value={notificationState}
            onValueChange={toggleNotificationState}
          />
        </View>

        <View className="flex-row items-center justify-between p-2 my-1 h-12 rounded-lg bg-gray-200">
          <Text>Adjust date</Text>

          <View className="flex-row gap-x-4 ">
            <Pressable
              onPress={editDaysCorrection}
              className="flex-row items-center justify-between px-2 w-17 h-8 shadow bg-gray-100 rounded-lg"
            >
              <Text>
                {daysCorrection! >= 0 ? "+" : "-"}
                {daysCorrection}
              </Text>
              <Text>days</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View>
        <Text className="text-lg text-gray-700">Legal</Text>

        <ScreenLink href="/settings/terms-of-use" title="Terms of use" />
        <ScreenLink href="/settings/privacy-policy" title="Privacy policy" />
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
