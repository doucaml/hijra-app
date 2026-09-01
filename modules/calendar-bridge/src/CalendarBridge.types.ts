export type MonthPropsType = {
  length: number;
  firstDayWeekPosition: number;
};

export type DateType = {
  day: number;
  month: number;
  year: number;

  monthEnStr: string;
};

export type CalendarType = "hijri" | "gregorian";
