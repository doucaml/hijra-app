import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, Linking, Pressable, Text, View } from "react-native";
import { useNotifications } from "../settings";

export default function Screen() {
  const { toggleNotificationsActivation } = useNotifications()
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const setFinalState = async () => {
      toggleNotificationsActivation();
      router.back();
    };

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current === "background" && nextAppState === "active")
        setFinalState();
    });

    return () => {
      subscription.remove();
    };
  }, [toggleNotificationsActivation]);

  const onBtnPress = async () => {
    Linking.openSettings();
    appState.current = "background";
  };

  return (
    <View className="flex-1 gap-y-6">
      <Text className="text-lg">
        Notifications are currently disabled, you have to enable them on the
        settings.
      </Text>

      <Pressable
        onPress={onBtnPress}
        className="w-full rounded-xl h-12 bg-gray-500"
      >
        <Text className="text-center text-lg my-auto text-white">
          Allow notifications
        </Text>
      </Pressable>
    </View>
  );
}
