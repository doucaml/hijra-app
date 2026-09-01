import {
  CalendarType,
  DateType,
} from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridge from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { useState } from "react";
import CelebrationsJson from "@/data/celebrations.json";

interface ValueType {
  title: string;
  description: string;
  actions?: {
    duty?: string[];
    recommended?: string[];
  };
}

type DayType = Record<number, ValueType[]>;

type CelebrationsType = Record<number, DayType>;

export const Celebrations: CelebrationsType =
  CelebrationsJson as CelebrationsType;

export const daysInitials = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CALENDAR_ROWS = 6;
export const CALENDAR_COLS = 7;
export const TOTAL_DAYS = CALENDAR_ROWS * CALENDAR_COLS;

export const getMonthTable = (
  firstDayPositionInWeek: number,
  monthLength: number,
) => {
  const calendarTable = new Array(CALENDAR_ROWS)
    .fill(null)
    .map(() => new Array(CALENDAR_COLS).fill(null));

  let currentDay = 1;

  for (let i = firstDayPositionInWeek - 1; i < CALENDAR_COLS; i++) {
    calendarTable[0][i] = currentDay;
    currentDay++;
  }

  for (let i = 1; i <= CALENDAR_ROWS; i++) {
    for (let j = 0; j < CALENDAR_COLS && currentDay <= monthLength; j++) {
      calendarTable[i][j] = currentDay;
      currentDay++;
    }
  }

  return calendarTable;
};

type DateInternalType = { day: number; month: number; year: number };

export class CalendarDate {
  private date: DateInternalType;

  constructor(day?: number, month?: number, year?: number) {
    if (day && month && year)
      this.date = {
        day: day,
        month: month,
        year: year,
      };
    else
      this.date = {
        day: todayHijraDate.day,
        month: todayHijraDate.month,
        year: todayHijraDate.year,
      };
  }

  editDate(day: number, month: number, year: number) {
    this.date = {
      day: day,
      month: month,
      year: year,
    };
  }

  get hijrahDate() {
    return CalendarBridge.getHijrahDate(
      this.date.day,
      this.date.month,
      this.date.year,
    );
  }

  get gregorianDate() {
    return CalendarBridge.convertHijriToGregorian(
      this.date.day,
      this.date.month,
      this.date.year,
    );
  }

  get hijrahMonthProps() {
    return CalendarBridge.getMonthProps(
      "hijri",
      this.date.month,
      this.date.year,
    );
  }

  static convertToHijri(day: number, month: number, year: number): DateType {
    return CalendarBridge.convertGregorianToHijri(day, month, year);
  }

  static convertToGregorian(
    day: number,
    month: number,
    year: number,
  ): DateType {
    return CalendarBridge.convertHijriToGregorian(day, month, year);
  }

  static getMonthLength(
    type: CalendarType,
    month: number,
    year: number,
  ): number {
    return CalendarBridge.getMonthProps(type, month, year).length;
  }
}

export const todayHijraDate = CalendarBridge.todayDate;

const date = new Date();

export const todayGregorianDate: DateType = {
  day: date.getDate(),
  month: date.getMonth() + 1,
  monthEnStr: monthList[date.getMonth()],
  year: date.getFullYear(),
};

export const useCalendarDate = () => {
  const [date, setDate] = useState(new CalendarDate());

  const editDate = (day: number, month: number, year: number) =>
    setDate(new CalendarDate(day, month, year));

  return {
    hijrahDate: date.hijrahDate,
    gregorianDate: date.gregorianDate,
    monthProps: date.hijrahMonthProps,
    editDate,
    convertToGregorian: CalendarDate.convertToGregorian,
    convertToHijri: CalendarDate.convertToHijri,
  };
};
