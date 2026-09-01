import * as Notifications from "expo-notifications";
import NotificationsData from "@/data/casualEvents.json";

type WeeklyNotificationType =
  (typeof NotificationsData.weeklyEvents)[keyof typeof NotificationsData.weeklyEvents];

type MonthlyNotificationType =
  (typeof NotificationsData.monthlyEvents)[keyof typeof NotificationsData.monthlyEvents];

export const checkNotificationPermission = async () => {
  let { status: currentStatus } = await Notifications.getPermissionsAsync();

  if (currentStatus !== "granted") {
    const { status: finalStatus } =
      await Notifications.requestPermissionsAsync();
    currentStatus = finalStatus;
  }

  if (currentStatus !== "granted") {
    console.log("Permission denied.");
    return;
  }
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
  notification: WeeklyNotificationType,
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

export const checkNotificationsRegistering = async () => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  const notificationsIdentifiers = scheduledNotifications.map(
    (value) => value.identifier,
  );

  const notScheduledNotifications: (
    WeeklyNotificationType | MonthlyNotificationType
  )[] = [];

  Object.values(NotificationsData.weeklyEvents).forEach((value) => {
    if (!notificationsIdentifiers.includes(value.identifier)) {
      console.log("Notification with id:", value.identifier, "not scheduled.");
      notScheduledNotifications.push(value);
    }
  });

  Object.values(NotificationsData.monthlyEvents).forEach((value) => {
    if (!notificationsIdentifiers.includes(value.identifier)) {
      console.log("Notification with id:", value.identifier, "not scheduled.");
      notScheduledNotifications.push(value);
    }
  });

  return notScheduledNotifications;
};
