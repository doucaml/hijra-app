import HistoricDatesJson from "@/data/historicDates.json";
import {
  goodPracticesContent,
  PracticesKeyType,
} from "@/utils/reccurentEventsContent";
import { CalendarDate, Celebrations } from "@/utils/dates";

export type HistoricalEvent = {
  title: string;
  year: string;
  gregorian: string;
  description: string;
};

type HistoricalDatesType = Record<number, Record<number, HistoricalEvent[]>>;

const HistoricalDates = HistoricDatesJson as HistoricalDatesType;

export type CalendarEventType = "celebration" | "historical";

export type CalendarEvent = {
  type: CalendarEventType;
  title?: string;
};

export type RecommendedPractice = {
  key: PracticesKeyType;
  title: string;
};

export const getRecommendedPractices = (
  day: number,
  month: number,
  year: number,
): RecommendedPractice[] => {
  const practices: RecommendedPractice[] = [];
  const gregorianDate = CalendarDate.convertToGregorian(day, month, year);
  const weekday = new Date(
    Date.UTC(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day),
  ).getUTCDay();

  if (weekday === 5) {
    practices.push({
      key: "jumuah-prayer",
      title: goodPracticesContent["jumuah-prayer"].title,
    });
  }

  if (weekday === 1 || weekday === 4) {
    practices.push({
      key: "monday-and-thursday-fasting",
      title: goodPracticesContent["monday-and-thursday-fasting"].title,
    });
  }

  const isWhiteDay =
    [13, 14, 15].includes(day) && !(month === 12 && day === 13);

  if (isWhiteDay) {
    practices.push({
      key: "white-days",
      title: goodPracticesContent["white-days"].title,
    });
  }

  return practices;
};

export const getHistoricalEvents = (
  day: number,
  month: number,
): HistoricalEvent[] => HistoricalDates[month]?.[day] ?? [];

export const getCalendarEvent = (
  day: number,
  month: number,
): CalendarEvent | undefined => {
  const celebrations = Celebrations[month]?.[day];

  if (celebrations?.length) {
    return {
      type: "celebration",
      title: celebrations[0].title,
    };
  }

  const historicalEvents = getHistoricalEvents(day, month);

  if (historicalEvents.length) {
    return {
      type: "historical",
      title: historicalEvents[0].title,
    };
  }

  return undefined;
};
