import { ExpoConfig, ConfigContext } from "expo/config";

const APP_ID_PREFIX = "com.doukouss.hijra";

function getName(base: string = "Hijra") {
  switch (process.env.APP_VARIANT) {
    case "production":
      return base;
    case "preview":
      return `${base} (Preview)`;
    default:
      return `${base} (Dev)`;
  }
}

function getAppId() {
  switch (process.env.APP_VARIANT) {
    case "production":
      return APP_ID_PREFIX;
    case "preview":
      return `${APP_ID_PREFIX}.preview`;
    default:
      return `${APP_ID_PREFIX}.dev`;
  }
}

function getIcon() {
  switch (process.env.APP_VARIANT) {
    case "production":
      return undefined;
    case "preview":
      return "./assets/images/icon-preview.png";
    default:
      return "./assets/images/icon-dev.png";
  }
}

const icon = getIcon();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: config.slug ?? "hijra",
  name: getName(config.name ?? "Hijra"),
  icon: icon ?? config.icon,
  android: {
    ...config.android,
    package: getAppId(),
    icon: icon ?? config.android?.icon,
    adaptiveIcon: {
      ...config.android?.adaptiveIcon,
      foregroundImage: icon ?? config.android?.adaptiveIcon?.foregroundImage,
    },
  },
  plugins: [
    ...(config.plugins ?? []),
    [
      "expo-dev-client",
      {
        addGeneratedScheme: process.env.APP_VARIANT === "development",
      },
    ],
  ],
});
