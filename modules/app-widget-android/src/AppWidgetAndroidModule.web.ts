import { registerWebModule, NativeModule } from "expo";

import { AppWidgetAndroidModuleEvents } from "./AppWidgetAndroid.types";

// AppWidgetAndroidModule is not available on the web platform.
class AppWidgetAndroidModule extends NativeModule<AppWidgetAndroidModuleEvents> {}

export default registerWebModule(
  AppWidgetAndroidModule,
  "AppWidgetAndroidModule",
);
