import { createMMKV, useMMKVBoolean, useMMKVNumber } from "react-native-mmkv";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  dismissAllNotifications,
  isNotificationEnabled,
  registerReccurentNotifications,
  requestNotificationPermission,
} from "./notifications";
import { CalendarDate } from "./dates";
import AppWidgetAndroid from "@/modules/app-widget-android/src/AppWidgetAndroidModule";

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
  adjustedTodayDate: CalendarDate;
  notificationState: boolean;
  daysCorrection: number;
  toggleNotificationState: (withRequest: boolean) => void;
  editDaysCorrection: () => void;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  adjustedTodayDate: new CalendarDate(),
  notificationState: isEnabled!,
  daysCorrection: daysCorrection!,
  toggleNotificationState: (withRequest = false) => {},
  editDaysCorrection: () => {},
});

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [notificationState, setNotificationState] = useMMKVBoolean(
    "preferences.notifications",
  );

  const [daysCorrection, setDaysCorrection] = useMMKVNumber(
    "preferences.days_correction",
  );

  const [todayDate, setTodayDate] = useState(new CalendarDate());

  useEffect(() => {
    if (daysCorrection !== undefined) {
      CalendarDate.adjustDaysNumber(daysCorrection);
    }
  }, [daysCorrection]);

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

  const editDaysCorrection = () => {
    const nextValue = daysCorrection! === 2 ? -2 : daysCorrection! + 1;
    setDaysCorrection(nextValue);
    CalendarDate.adjustDaysNumber(nextValue);
    setTodayDate(new CalendarDate());
    AppWidgetAndroid.updateWidgets();
  };

  return (
    <PreferencesContext
      value={{
        adjustedTodayDate: todayDate,
        notificationState: notificationState!,
        daysCorrection: daysCorrection!,
        toggleNotificationState: toggleNotificationState,
        editDaysCorrection: editDaysCorrection,
      }}
    >
      {children}
    </PreferencesContext>
  );
}
