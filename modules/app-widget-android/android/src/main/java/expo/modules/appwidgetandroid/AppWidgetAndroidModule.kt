package expo.modules.appwidgetandroid

import expo.modules.appwidgetandroid.utils.updateWidgets
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class AppWidgetAndroidModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("AppWidgetAndroid")

    Function("updateWidgets") {
      val context = appContext.reactContext

      if (context != null) {
        CoroutineScope(Dispatchers.IO).launch {
          updateWidgets(context)
        }
      }
    }
  }
}
