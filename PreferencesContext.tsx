import { createMMKV, useMMKVBoolean, useMMKVNumber } from "react-native-mmkv";
import { createContext, ReactNode } from "react";
import { isNotificationEnabled } from "./notifications";

const storage = createMMKV();

let isEnabled = storage.getBoolean("preferences.notifications");
if (isEnabled === undefined) {
  storage.set("preferences.notifications", false);
  isEnabled = false;
}

let daysCorrection = storage.getNumber("preferences.days_correction");
if (daysCorrection === undefined) {
  storage.set("preferences.days_correction", 0);
  daysCorrection = 0;
}

const getNotificationStatus = async () => {
  const granted = await isNotificationEnabled();

  if (isEnabled && !granted) {
    storage.set("preferences.notifications", false);
    isEnabled = false;
  }
};

getNotificationStatus();

export const PreferencesContext = createContext({
  notificationState: isEnabled,
  daysCorrection: daysCorrection,
  setNotificationState: (_: boolean) => {},
  setDaysCorrection: (_: number) => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [notificationState, setNotificationState] = useMMKVBoolean(
    "preferences.notifications",
  );

  const [daysCorrection, setDaysCorrection] = useMMKVNumber(
    "preferences.days_correction",
  );

  return (
    <PreferencesContext
      value={{
        notificationState: notificationState!,
        daysCorrection: daysCorrection!,
        setNotificationState: setNotificationState,
        setDaysCorrection: setDaysCorrection,
      }}
    >
      {children}
    </PreferencesContext>
  );
}
