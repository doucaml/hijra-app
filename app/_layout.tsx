import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "@/global.css";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            marginTop: insets.top,
            marginBottom: insets.bottom,
          },
        }}
      >
        <Stack.Screen
          name="(bottom-sheets)"
          options={{
            presentation: "formSheet",
            contentStyle: {
              marginTop: 0,
            },
            sheetAllowedDetents: [0.5, 0.8],
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}
