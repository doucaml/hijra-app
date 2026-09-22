package expo.modules.appwidgetandroid.utils

import android.content.Context
import expo.modules.calendarbridge.CalendarDate

class WidgetDate(context: Context) {
    init {
        CalendarDate.correctionNumber = context
            .getSharedPreferences(CalendarDate.PREFERENCES_NAME, Context.MODE_PRIVATE)
            .getLong(CalendarDate.CORRECTION_KEY, 0)
    }
    val daysInitials = listOf("M", "T", "W", "T", "F", "S", "S")

    val currentDate = CalendarDate.todayDate
    val monthProps = CalendarDate.getMonthProps("hijri", currentDate.month, currentDate.year)
    val monthArStr = CalendarDate.getMonthArStr()

    private val daysList = MutableList<Int?>(35) { null }

    fun getDaysList() : MutableList<Int?> {
        for (index in (1..monthProps.length))
            daysList[monthProps.firstDayWeekPosition + index - 2] = index

        return daysList
    }
}
