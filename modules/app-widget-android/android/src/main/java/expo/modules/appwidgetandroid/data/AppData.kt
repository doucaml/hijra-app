package expo.modules.appwidgetandroid.data

import android.icu.text.SimpleDateFormat
import android.icu.util.ULocale
import java.time.chrono.HijrahDate
import java.time.temporal.ChronoField
import java.util.Date

class AppDate {
    val daysInitials = listOf("M", "T", "W", "T", "F", "S", "S")
    private val arLocale: ULocale = ULocale("ar_AR@calendar=islamic-umalqura")
    private val enLocale: ULocale = ULocale("en_US@calendar=islamic-umalqura")
    val todayDate: Date = Date()

    val arMonthStr: String = getDateWithCustomFormat("MMMM", arLocale)
    val enMonthStr: String = getDateWithCustomFormat("MMMM")
    val dateStr: String = getDateWithCustomFormat()

    private val todayDateHijrah = HijrahDate.now()
    val dayNumber = todayDateHijrah.get(ChronoField.DAY_OF_MONTH)
    val firstDayOfMonth = todayDateHijrah.with(ChronoField.DAY_OF_MONTH, 1)
    val firstDayPositionInWeek = firstDayOfMonth.get(ChronoField.DAY_OF_WEEK)
    val numDaysInMonth = todayDateHijrah.lengthOfMonth()
    private val daysList = MutableList<Int?>(35) { null }

    fun getDaysList() : MutableList<Int?> {
        for (index in (1..numDaysInMonth))
            daysList[firstDayPositionInWeek + index - 2] = index

        return daysList
    }

    fun getDateWithCustomFormat(pattern: String = "d MMMM y", dateLocal: ULocale = enLocale) : String {
        val customFormat = SimpleDateFormat(pattern, dateLocal)
        return customFormat.format(todayDate)
    }
}
