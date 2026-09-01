import * as Notifications from "expo-notifications";
import NotificationsData from "@/data/reccurentNotifications.json";
import { CalendarDate } from "./dates";

type NotificationFrequencyType = "weekly" | "monthly";

type WeeklyNotification = {
  identifier?: string;
  content: Notifications.NotificationContentInput;
  trigger: Omit<Notifications.WeeklyNotificationTrigger, "type">;
};

type MonthlyNotification = {
  identifier?: string;
  content: Notifications.NotificationContentInput;
  trigger: {
    day: number;
    hour: number;
    minute: number;
  };
};

type NotificationConfigType = {
  frequency: NotificationFrequencyType;
  identifier?: string;
  content: WeeklyNotification["content"] | MonthlyNotification["content"];
  trigger: WeeklyNotification["trigger"] | MonthlyNotification["trigger"];
};

export const checkNotificationPermission = async () => {
  let { status: currentStatus } = await Notifications.getPermissionsAsync();

  if (currentStatus !== "granted") {
    const { status: finalStatus } =
      await Notifications.requestPermissionsAsync();
    currentStatus = finalStatus;
  }

  if (currentStatus !== "granted") {
    console.log("Permission denied.");
    return false;
  } else return true;
};

export const registerNotification = async (
  content: Notifications.NotificationContentInput,
  trigger: Notifications.SchedulableNotificationTriggerInput | null = null,
  identifier?: string,
) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  Notifications.scheduleNotificationAsync({
    identifier: identifier,
    content: content,
    trigger: trigger,
  });
};

export const registerWeeklyNotification = async (
  notification: WeeklyNotification,
) => {
  await registerNotification(
    notification.content,
    {
      ...notification.trigger,
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
    },
    notification.identifier,
  );
};

export const registerMonthlyNotification = async (
  notification: MonthlyNotification,
) => {
  const todayDate = new CalendarDate();
  let trigger = notification.trigger;
  let triggerDate;

  if (trigger.day > todayDate.hijrahDate.day) {
    const date = new CalendarDate(
      trigger.day,
      todayDate.hijrahDate.month === 12 ? 1 : todayDate.hijrahDate.month + 1,
      todayDate.hijrahDate.month === 12
        ? todayDate.hijrahDate.year + 1
        : todayDate.hijrahDate.year,
    );

    triggerDate = new Date(
      date.gregorianDate.year,
      date.gregorianDate.month,
      date.gregorianDate.day,
      trigger.hour,
      trigger.minute,
    );
  } else {
    const date = new CalendarDate(
      trigger.day,
      todayDate.hijrahDate.month,
      todayDate.hijrahDate.year,
    );

    triggerDate = new Date(
      date.gregorianDate.year,
      date.gregorianDate.month,
      date.gregorianDate.day,
      trigger.hour,
      trigger.minute,
    );
  }

  await registerNotification(
    notification.content,
    {
      date: triggerDate,
      type: Notifications.SchedulableTriggerInputTypes.DATE,
    },
    notification.identifier,
  );
};

export const checkReccurentNotificationsRegistering = async () => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  const notificationsIdentifiers = scheduledNotifications.map(
    (value) => value.identifier,
  );

  const notScheduledNotifications: NotificationConfigType[] = [];

  Object.values(NotificationsData).forEach((notification) => {
    if (!notificationsIdentifiers.includes(notification.identifier)) {
      console.log(
        "Notification with id:",
        notification.identifier,
        "not scheduled.",
      );
      notScheduledNotifications.push(notification as NotificationConfigType);
    }
  });

  return notScheduledNotifications;
};

export const registerReccurentNotifications = async () => {
  const notScheduledNotifications =
    await checkReccurentNotificationsRegistering();

  Object.values(notScheduledNotifications).forEach(({ frequency, ...body }) => {
    if (frequency === "weekly")
      registerWeeklyNotification(body as WeeklyNotification);
    else registerMonthlyNotification(body as MonthlyNotification);
  });
};
