import { NativeModule, requireNativeModule } from "expo";

import { AppWidgetAndroidModuleEvents } from "./AppWidgetAndroid.types";

declare class AppWidgetAndroidModule extends NativeModule<AppWidgetAndroidModuleEvents> {
  hello(): string;
}

export default requireNativeModule<AppWidgetAndroidModule>("AppWidgetAndroid");
