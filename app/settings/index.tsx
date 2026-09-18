import { isNotificationEnabled } from "@/notifications";
import { PreferencesContext } from "@/PreferencesContext";
import { Href, Link, router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useContext, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function ScreenLink({ href, title }: { href: Href; title: string }) {
  return (
    <Link href={href} className="p-3 my-1 rounded-lg bg-gray-200">
      <Text>{title}</Text>
    </Link>
  );
}

function SwitchBtn({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) {
  return (
    <Pressable onPress={onChange}>
      <View className="flex-row w-12 h-6 bg-gray-300 rounded-xl border-2 border-gray-500">
        <View
          style={value === false ? styles.switchBtnTrue : styles.switchBtnFalse}
        />
        <View
          style={value === true ? styles.switchBtnTrue : styles.switchBtnFalse}
        />
      </View>
    </Pressable>
  );
}

export default function Screen() {
  const {
    notificationState,
    toggleNotificationState,
    daysCorrection,
    editDaysCorrection,
  } = useContext(PreferencesContext);

  useEffect(() => {
    const checkNotificationValue = async () => {
      const granted = await isNotificationEnabled();
      if (notificationState && !granted) toggleNotificationState(false);
    };

    checkNotificationValue();
  }, []);

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
            value={notificationState!}
            onChange={() => toggleNotificationState(true)}
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

const styles = StyleSheet.create({
  switchBtnTrue: {
    borderRadius: 12,
    backgroundColor: "gray",
    width: "50%",
    height: "auto",
  },
  switchBtnFalse: {
    width: "50%",
    height: "auto",
  },
});
