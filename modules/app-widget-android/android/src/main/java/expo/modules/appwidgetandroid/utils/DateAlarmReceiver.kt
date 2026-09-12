package expo.modules.appwidgetandroid.utils

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.glance.appwidget.GlanceAppWidgetManager
import expo.modules.appwidgetandroid.TodayDate.Widget
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import expo.modules.appwidgetandroid.utils.setUpAlarm

class DateAlarmReceiver: BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val manager = GlanceAppWidgetManager(context)
        val widget = Widget()

        CoroutineScope(Dispatchers.IO).launch {
            val glanceIds = manager.getGlanceIds(widget.javaClass)
            glanceIds.forEach {
                glanceId -> widget.update(context, glanceId)
            }
        }

        setUpAlarm(context)
    }
}
