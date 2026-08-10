import { CalendarType, DateType } from "@/modules/calendar-bridge/src/CalendarBridge.types";
import CalendarBridge from "@/modules/calendar-bridge/src/CalendarBridgeModule";
import { useEffect, useState } from "react";
import EventsJson from "@/data/events.json"

type EventsType = Record<string, Record<string, string>>
const Events: EventsType = EventsJson as EventsType

export const daysInitials = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const CALENDAR_ROWS = 6;
export const CALENDAR_COLS = 7;
export const TOTAL_DAYS = CALENDAR_ROWS * CALENDAR_COLS;

export const getMonthTable = (firstDayPositionInWeek: number, monthLength: number) => {
  const calendarTable = new Array(CALENDAR_ROWS).fill(null).map(() => new Array(CALENDAR_COLS).fill(null))

  let currentDay = 1;

  for (let i = firstDayPositionInWeek - 1; i < CALENDAR_COLS; i++)
  {
    calendarTable[0][i] = currentDay;
    currentDay++;
  }

  for (let i = 1; i <= CALENDAR_ROWS ; i++) {
    for (let j = 0; j < CALENDAR_COLS && ((CALENDAR_COLS * i) + j) < monthLength; j++) {
      calendarTable[i][j] = currentDay;
      currentDay++;
    }
  }

  return calendarTable;
}

export class DateHelper {
  get hijrahDate() {
    return CalendarBridge.hijrahDate
  }

  get gregorianDate() {
    return CalendarBridge.gregorianDate
  }

  get monthProps() {
    return CalendarBridge.monthProps
  }

  setPreviousMonth() {
    CalendarBridge.setToPreviousMonth()
  }

  setNextMonth() {
    CalendarBridge.setToNextMonth()
  }

  static setDate(day: number, month: number, year: number) {
    CalendarBridge.setDate(day, month, year)
  }

  static convertToHijri(day: number, month: number, year: number): DateType {
    return CalendarBridge.convertGregorianToHijri(day, month, year)
  }

  static convertToGregorian(day: number, month: number, year: number): DateType {
    return CalendarBridge.convertHijriToGregorian(day, month, year)
  }

  static getMonthLength(type: CalendarType, month: number, year: number): number {
    return CalendarBridge.getMonthProps(type, month, year).length;
  }
}

export const todayDate = CalendarBridge.todayDate

export const useDate = () => {
  const date = new DateHelper()

  const [hijrahDate, setHijraDate] = useState(date.hijrahDate)
  const [gregorianDate, setGregorianDate] = useState(date.gregorianDate)
  const [monthProps, setMonthProps] = useState(date.monthProps)

  useEffect(() => {
    const listener = CalendarBridge.addListener(
      "onDateChange",
      () => {
        setGregorianDate(date.gregorianDate)
        setHijraDate(date.hijrahDate)
        setMonthProps(date.monthProps)
    })

    return () => listener.remove()
  }, [])

  const setDate = (day: number, month: number, year: number) => {
    DateHelper.setDate(day, month, year)
  }

  const convertToHijri = (day: number, month: number, year: number) => {
    return DateHelper.convertToHijri(day, month, year)
  }

  const convertToGregorian = (day: number, month: number, year: number) => {
    return DateHelper.convertToGregorian(day, month, year)
  }
  return {
    hijrahDate,
    gregorianDate,
    monthProps,
    setDate,
    convertToGregorian,
    convertToHijri
  }
}

export const getEvents = (): EventsType => {
  return Events
}
