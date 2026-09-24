import * as Notifications from "expo-notifications";
import NotificationsData from "@/data/reccurentNotifications.json";
import HistoricDatesJson from "@/data/historicDates.json";
import { CalendarDate, Celebrations } from "./dates";
import { Href, router } from "expo-router";
import { useEffect } from "react";

export type NotificationEventType =
  | "recurrent"
  | "celebration"
  | "historical";

type NotificationData = {
  type?: NotificationEventType;
  uri?: string;
  month?: number;
  day?: number;
  index?: number;
};

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

type NotificationConfig = {
  identifier: string;
  content: Notifications.NotificationContentInput;
  trigger: Notifications.SchedulableNotificationTriggerInput;
  frequency?: NotificationFrequencyType;
};

type RecurringNotification =
  | {
      frequency: "weekly";
      identifier: string;
      content: Notifications.NotificationContentInput;
      trigger: { weekday: number; hour: number; minute: number };
    }
  | {
      frequency: "monthly";
      identifier: string;
      content: Notifications.NotificationContentInput;
      trigger: { day: number; hour: number; minute: number };
    };

const ANNUAL_NOTIFICATION_HOUR = 8;
const ANNUAL_NOTIFICATION_MINUTE = 0;

export const isNotificationEnabled = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  return granted;
};

export const requestNotificationPermission = async () => {
  const currentPermissions = await Notifications.getPermissionsAsync();
  if (currentPermissions.granted) {
    return true;
  }

  if (!currentPermissions.canAskAgain) {
    router.navigate("/(bottom-sheets)/notifications-permission");
    return false;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();
  return requestedPermissions.granted;
};

let notificationHandlerConfigured = false;

const registerNotification = async (
  content: Notifications.NotificationContentInput,
  trigger: Notifications.SchedulableNotificationTriggerInput | null = null,
  identifier?: string,
) => {
  if (!notificationHandlerConfigured) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
    notificationHandlerConfigured = true;
  }

  await Notifications.scheduleNotificationAsync({
    identifier,
    content,
    trigger,
  });
};

const getNextHijriOccurrence = (
  day: number,
  month: number,
  hour: number,
  minute: number,
) => {
  const today = new CalendarDate();
  let year = today.hijrahDate.year;
  let gregorianDate = CalendarDate.convertToGregorian(day, month, year);
  let notificationDate = new Date(
    gregorianDate.year,
    gregorianDate.month - 1,
    gregorianDate.day,
    hour,
    minute,
    0,
    0,
  );

  if (notificationDate <= new Date()) {
    year += 1;
    gregorianDate = CalendarDate.convertToGregorian(day, month, year);
    notificationDate = new Date(
      gregorianDate.year,
      gregorianDate.month - 1,
      gregorianDate.day,
      hour,
      minute,
      0,
      0,
    );
  }

  return notificationDate;
};

const getNextMonthlyOccurrence = (
  day: number,
  hour: number,
  minute: number,
) => {
  const today = new CalendarDate();
  const current = today.hijrahDate;
  const now = new Date();
  const isBeforeNotificationTime =
    current.day < day ||
    (current.day === day &&
      (now.getHours() < hour ||
        (now.getHours() === hour && now.getMinutes() < minute)));
  const candidateMonth = isBeforeNotificationTime
    ? current.month
    : current.month === 12
      ? 1
      : current.month + 1;
  const candidateYear = isBeforeNotificationTime
    ? current.year
    : current.month === 12
      ? current.year + 1
      : current.year;
  const candidate = new CalendarDate(day, candidateMonth, candidateYear)
    .gregorianDate;

  return new Date(
    candidate.year,
    candidate.month - 1,
    candidate.day,
    hour,
    minute,
  );
};

const getRecurringNotificationConfigs = (): NotificationConfig[] =>
  (Object.values(NotificationsData) as RecurringNotification[]).map(
    (notification): NotificationConfig => {
      const { frequency, identifier, content, trigger } = notification;

    if (frequency === "weekly") {
      return {
        identifier,
        content: {
          ...content,
          data: {
            type: "recurrent" as const,
            ...(content.data as Record<string, unknown>),
          },
        },
        trigger: {
          ...trigger,
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        },
        frequency,
      };
    }

    return {
      identifier,
      content: {
        ...content,
        data: {
          type: "recurrent" as const,
          ...(content.data as Record<string, unknown>),
        },
      },
      trigger: {
        date: getNextMonthlyOccurrence(
          trigger.day,
          trigger.hour,
          trigger.minute,
        ),
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
      frequency,
    };
    },
  );

const getAnnualNotificationConfigs = (): NotificationConfig[] => {
  const configurations: NotificationConfig[] = [];

  Object.entries(Celebrations).forEach(([month, days]) => {
    Object.entries(days).forEach(([day, celebrations]) => {
      celebrations.forEach((celebration, index) => {
        const monthNumber = Number(month);
        const dayNumber = Number(day);
        configurations.push({
          identifier: `celebration-${monthNumber}-${dayNumber}-${index}`,
          content: {
            title: celebration.title,
            body: "Discover more about this celebration",
            data: {
              type: "celebration",
              month: monthNumber,
              day: dayNumber,
              index,
            },
          },
          trigger: {
            date: getNextHijriOccurrence(
              dayNumber,
              monthNumber,
              ANNUAL_NOTIFICATION_HOUR,
              ANNUAL_NOTIFICATION_MINUTE,
            ),
            type: Notifications.SchedulableTriggerInputTypes.DATE,
          },
        });
      });
    });
  });

  Object.entries(HistoricDatesJson).forEach(([month, days]) => {
    Object.entries(days).forEach(([day, historicalEvents]) => {
      historicalEvents.forEach((event, index) => {
        const monthNumber = Number(month);
        const dayNumber = Number(day);
        configurations.push({
          identifier: `historical-${monthNumber}-${dayNumber}-${index}`,
          content: {
            title: event.title,
            body: "Discover more about this historical event",
            data: {
              type: "historical",
              month: monthNumber,
              day: dayNumber,
              index,
            },
          },
          trigger: {
            date: getNextHijriOccurrence(
              dayNumber,
              monthNumber,
              ANNUAL_NOTIFICATION_HOUR,
              ANNUAL_NOTIFICATION_MINUTE,
            ),
            type: Notifications.SchedulableTriggerInputTypes.DATE,
          },
        });
      });
    });
  });

  return configurations;
};

const getNotificationConfigs = () => [
  ...getRecurringNotificationConfigs(),
  ...getAnnualNotificationConfigs(),
];

const registerNotificationConfig = async (config: NotificationConfig) => {
  await registerNotification(config.content, config.trigger, config.identifier);
};

export const registerNotifications = async () => {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();
  const scheduledIdentifiers = new Set(
    scheduledNotifications.map(({ identifier }) => identifier),
  );

  for (const config of getNotificationConfigs()) {
    if (!scheduledIdentifiers.has(config.identifier)) {
      await registerNotificationConfig(config);
    }
  }
};

// Kept as a compatibility alias for existing callers.
export const registerReccurentNotifications = registerNotifications;

export const dismissAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.dismissAllNotificationsAsync();
  } catch (e) {
    console.error(e);
  }
};

export const useNotificationResponse = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    const data = lastNotificationResponse?.notification.request.content
      .data as NotificationData | undefined;

    if (!data) return;

    if (data.type === "celebration" && data.month && data.day) {
      router.push({
        pathname: "/events/celebration",
        params: {
          celebrationIndex: String(data.index ?? 0),
          month: String(data.month),
          day: String(data.day),
        },
      });
    } else if (data.type === "historical" && data.month && data.day) {
      router.push({
        pathname: "/events/historical/[uri]",
        params: {
          uri: "event",
          historicalIndex: String(data.index ?? 0),
          month: String(data.month),
          day: String(data.day),
        },
      });
    } else if (data.uri) {
      router.push(("/events/reccurent/" + data.uri) as Href);
    }
  }, [lastNotificationResponse]);
};

export const registerTestNotification = async () => {
  await registerNotification(
    {
      title: "Test notification",
      body: "Here is the test notification",
      data: { type: "recurrent", uri: "jumuah-prayer" },
    },
    {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
    "test-notification",
  );
};
