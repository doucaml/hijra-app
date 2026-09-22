import { requireNativeModule } from "expo";

declare class AppWidgetAndroidModule {}

export default requireNativeModule<AppWidgetAndroidModule>("AppWidgetAndroid");
