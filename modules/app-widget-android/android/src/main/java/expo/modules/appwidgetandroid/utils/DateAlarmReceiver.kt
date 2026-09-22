package expo.modules.appwidgetandroid.utils

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import expo.modules.appwidgetandroid.utils.setUpAlarm
import expo.modules.appwidgetandroid.utils.updateWidgets

class DateAlarmReceiver: BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        CoroutineScope(Dispatchers.IO).launch {
            updateWidgets(context)
        }

        setUpAlarm(context)
    }
}
