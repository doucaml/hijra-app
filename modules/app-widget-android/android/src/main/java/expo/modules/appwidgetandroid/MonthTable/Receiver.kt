package expo.modules.appwidgetandroid.MonthTable

import android.content.Context
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import expo.modules.appwidgetandroid.utils.setUpAlarm

class Receiver: GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget
        get() = MonthTableWidget()

    override fun onEnabled(context: Context) {
        setUpAlarm(context)
        super.onEnabled(context)
    }
}
