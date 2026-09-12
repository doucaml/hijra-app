package expo.modules.calendarbridge

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import expo.modules.calendarbridge.CalendarDate

class CalendarBridgeModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("CalendarBridge")

        Property("todayDate") {
            CalendarDate.todayDate
        }

        Function("getMonthProps") {
            calendar: String, month: Int, year: Int -> CalendarDate
            .getMonthProps(calendar, month, year)
        }

        Function("getHijrahDate") {
            day: Int, month: Int, year: Int -> CalendarDate
            .getHijrahDate(day, month, year)
        }

        Function("getGregorianDate") {
            day: Int, month: Int, year: Int -> CalendarDate
            .getGregorianDate(day, month, year)
        }

        Function("convertHijriToGregorian") {
            day: Int, month: Int, year: Int -> CalendarDate.convertHijriToGregorian(
                day, month, year
            )
        }

        Function("convertGregorianToHijri") {
            day: Int, month: Int, year: Int -> CalendarDate.convertGregorianToHijri(
                day, month, year
            )
        }
    }
}
