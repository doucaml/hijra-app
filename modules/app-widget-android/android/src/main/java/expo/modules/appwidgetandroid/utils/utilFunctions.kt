package expo.modules.appwidgetandroid.utils

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent

import java.time.LocalDateTime
import java.time.ZoneId


fun setUpAlarm(context: Context) {
    val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    val intent = Intent(context, DateAlarmReceiver::class.java)
    val pendingIntent = PendingIntent.getBroadcast(
        context,
        0,
        intent,
        PendingIntent.FLAG_IMMUTABLE
    )

    val actualTime = LocalDateTime.now()

    var targetTime = actualTime
        .withHour(0)
        .withMinute(0)
        .withSecond(0)

    if (targetTime.isBefore(actualTime))
        targetTime = targetTime.plusDays(1)

    val timeInMilli = targetTime
        .atZone(ZoneId.systemDefault())
        .toInstant()
        .toEpochMilli()

    alarmManager.setExact(
        AlarmManager.RTC_WAKEUP,
        timeInMilli,
        pendingIntent
    )
}
