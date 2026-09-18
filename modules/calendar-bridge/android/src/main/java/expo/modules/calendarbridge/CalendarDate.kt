package expo.modules.calendarbridge

import java.time.chrono.HijrahDate
import java.time.chrono.ChronoLocalDate
import java.time.temporal.ChronoField
import java.time.temporal.ChronoUnit
import java.time.format.DateTimeFormatter
import java.time.LocalDate

import java.util.Locale

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record


class MonthProps(
    @Field val length: Int = 0,
    @Field val firstDayWeekPosition: Int = 1
): Record

class Date(
    @Field val day: Int = 1,
    @Field val month: Int = 1,
    @Field val year: Int = 1,
    @Field val monthEnStr: String = "",
): Record

class CalendarDate {
    companion object {
        var correctionNumber: Long = 0

        val today: HijrahDate
        get() = HijrahDate.now().plus(correctionNumber, ChronoUnit.DAYS)

        val todayDate: Date
        get() = CalendarDate.getDateMap(today)

        fun getMonthProps(calendar: String, month: Int, year: Int): MonthProps {
            val date = if (calendar == "hijri") HijrahDate.of(year, month, 1) else LocalDate.of(year, month, 1)

            return MonthProps(
                length = date.lengthOfMonth(),
                firstDayWeekPosition = date.get(ChronoField.DAY_OF_WEEK)
            )
        }

        fun editAdjustDay(newNumber: Long) {
            CalendarDate.correctionNumber = newNumber
        }

        fun getDateMap(date: ChronoLocalDate): Date {
            return Date(
                day = date.get(ChronoField.DAY_OF_MONTH),
                month = date.get(ChronoField.MONTH_OF_YEAR),
                year = date.get(ChronoField.YEAR),
                monthEnStr = CalendarDate.formatDate("MMMM", date)
            )
        }

        fun getMonthArStr(): String {
            return CalendarDate.formatDate("MMMM", CalendarDate.today, Locale("ar"))
        }

        fun formatDate(pattern: String, date: ChronoLocalDate, locale: Locale = Locale.UK): String {
            val dateFormatter = DateTimeFormatter.ofPattern(pattern, locale)
            return date.format(dateFormatter)
        }

        fun convertGregorianToHijri(day: Int, month: Int, year: Int): Date {
            val gregorianDate = LocalDate.of(year, month, day)
            val hijrahDate = HijrahDate.from(gregorianDate)

            return CalendarDate.getDateMap(hijrahDate)
        }

        fun convertHijriToGregorian(day: Int, month: Int, year: Int): Date {
            val hijrahDate = HijrahDate.of(year, month, day)
            val gregorianDate = LocalDate.from(hijrahDate)

            return CalendarDate.getDateMap(gregorianDate)
        }

        fun getHijrahDate(day: Int, month: Int, year: Int): Date {
            val date = HijrahDate.of(year, month, day)
            return CalendarDate.getDateMap(date)
        }

        fun getGregorianDate(day: Int, month: Int, year: Int): Date {
            val date = LocalDate.of(year, month, day)
            return CalendarDate.getDateMap(date)
        }
    }
}
