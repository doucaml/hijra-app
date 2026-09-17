package expo.modules.appwidgetandroid.utils

import expo.modules.calendarbridge.CalendarDate

class WidgetDate {
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
