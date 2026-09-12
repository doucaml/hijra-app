import { PreferencesContext } from "@/PreferencesContext";
import { router } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import { AppState, Linking, Pressable, Text, View } from "react-native";

export default function Screen() {
  const { toggleNotificationState } = useContext(PreferencesContext);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const setFinalState = async () => {
      toggleNotificationState(false);
      router.back();
    };

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current === "background" && nextAppState === "active")
        setFinalState();
    });

    return () => {
      subscription.remove();
    };
  }, [toggleNotificationState]);

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
