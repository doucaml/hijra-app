import { createMMKV, useMMKVBoolean, useMMKVNumber } from "react-native-mmkv";
import { createContext, ReactNode } from "react";
import {
  dismissAllNotifications,
  isNotificationEnabled,
  registerReccurentNotifications,
  requestNotificationPermission,
} from "./notifications";

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

type PreferencesContextType = {
  notificationState: boolean;
  daysCorrection: number;
  toggleNotificationState: (withRequest: boolean) => void;
  setDaysCorrection: (days: number) => void;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  notificationState: isEnabled!,
  daysCorrection: daysCorrection!,
  toggleNotificationState: (withRequest = false) => {},
  setDaysCorrection: (_) => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [notificationState, setNotificationState] = useMMKVBoolean(
    "preferences.notifications",
  );

  const [daysCorrection, setDaysCorrection] = useMMKVNumber(
    "preferences.days_correction",
  );

  const toggleNotificationState = async (withRequest: boolean = false) => {
    if (notificationState) {
      dismissAllNotifications();
      setNotificationState(false);
      return;
    }

    const isEnabled = await isNotificationEnabled();

    if (isEnabled) {
      registerReccurentNotifications();
      setNotificationState(true);
      return;
    }

    if (withRequest) {
      const granted = await requestNotificationPermission();

      if (granted) {
        registerReccurentNotifications();
        setNotificationState(true);
      }
    }
  };

  return (
    <PreferencesContext
      value={{
        notificationState: notificationState!,
        daysCorrection: daysCorrection!,
        toggleNotificationState: toggleNotificationState,
        setDaysCorrection: setDaysCorrection,
      }}
    >
      {children}
    </PreferencesContext>
  );
}
