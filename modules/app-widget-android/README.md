# App Widget Android

Ce module contient l'implémentation native Android des widgets Hijra. Il est autonome par rapport à l'ancien projet `HijraWidgetDemo` : le code Kotlin, les ressources, les receivers et les dépendances Glance sont définis ici.

## Développer avec les previews

Ouvrir le projet Android suivant dans Android Studio :

```text
hijra/android
```

Le module est inclus automatiquement par Expo sous le nom `:app-widget-android`. Les previews Glance sont disponibles dans :

- `TodayDate/Widget.kt` : `TodayDateWidgetPreview`
- `GeneralCalendar/Widget.kt` : `GeneralCalendarWidgetPreview`

Les previews utilisent des données d'exemple déterministes. Elles ne dépendent ni du launcher, ni d'un receiver, ni de l'application JavaScript.

## Vérifier le module

Depuis `hijra/android` :

```bash
./gradlew :app-widget-android:compileDebugKotlin
```

Pour vérifier l'intégration complète dans l'application Expo :

```bash
./gradlew :app:assembleDebug
```

Les tests sur un launcher Android restent nécessaires pour valider l'installation, le redimensionnement et les mises à jour par alarme du widget.
