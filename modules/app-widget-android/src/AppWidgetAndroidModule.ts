import { requireNativeModule } from "expo";

declare class AppWidgetAndroidModule {
  updateWidgets(): void;
}

export default requireNativeModule<AppWidgetAndroidModule>("AppWidgetAndroid");
