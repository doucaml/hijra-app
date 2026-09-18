import { requireNativeModule } from "expo";

import { CalendarType, DateType, MonthPropsType } from "./CalendarBridge.types";

declare class CalendarBridgeModule {
  todayDate: DateType;

  getMonthProps(
    calendar: CalendarType,
    month: number,
    year: number,
  ): MonthPropsType;
  getHijrahDate(day: number, month: number, year: number): DateType;
  getGregorianDate(day: number, month: number, year: number): DateType;
  convertGregorianToHijri(day: number, month: number, year: number): DateType;
  convertHijriToGregorian(day: number, month: number, year: number): DateType;
  adjustDay(newNumber: number): void;
}

export default requireNativeModule<CalendarBridgeModule>("CalendarBridge");
