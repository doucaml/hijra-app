package expo.modules.appwidgetandroid.TodayDate

import android.content.Context
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import expo.modules.appwidgetandroid.data.setUpAlarm

class Receiver: GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget
        get() = Widget()

    override fun onEnabled(context: Context) {
        setUpAlarm(context)
        super.onEnabled(context)
    }
}