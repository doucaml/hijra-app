package expo.modules.appwidgetandroid.utils

import expo.modules.calendarbridge.CalendarDate

class WidgetDate() {
    val daysInitials = listOf("M", "T", "W", "T", "F", "S", "S")

    val currentDate = CalendarDate.todayDate
    val monthProps = CalendarDate.getMonthProps("hijri", currentDate.month, currentDate.year)
    val monthArStr = CalendarDate.getMonthArStr()

    fun getDaysList() : List<Int?> {
        val cells = MutableList<Int?>(42) { null }
        val start = monthProps.firstDayWeekPosition - 1
        var day = 1

        while (day <= monthProps.length && start + day - 1 < 42) {
            cells[start + day - 1] = day
            day++
        }

        return cells
    }
}
