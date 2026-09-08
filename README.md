# Hijra

Hijra is a mobile application for reconnecting with the Hijri calendar. I came up with the idea after reading an article from the Yaqeen Institute about the history of the Islamic calendar and its political significance throughout history ([link to the article](https://yaqeeninstitute.org/read/paper/the-months-ordained-by-allah-reviving-the-islamic-calendar)).

The goal of the app is to help users learn more about Islamic history and celebrations, while also providing a way to reconnect with the Hijri calendar and some of the practices associated with specific dates.

# Features

The features currently include:

* Browsing the Hijri calendar and viewing the Gregorian/Hijri equivalent for each date
* A widget displaying the current date or a monthly calendar view (Android only for now)
* Notifications about recommended practices for specific days (e.g. recommended fasting on Mondays)
* Descriptions of celebrations and historical events

# Tech Stack

The application is built with React Native and Expo, with a few notable libraries and technologies:

* Lucide React Native for icons
* Expo Notifications for notifications
* Expo Modules for integrating custom libraries written in native code

Since there is currently no standard way to build widgets using React Native alone, the Android widgets are built with Kotlin and Android Jetpack Glance.

The app also uses a Java implementation of the Hijri calendar, which is exposed through a custom library. I chose this approach because I couldn't find a sufficiently polished Hijri calendar implementation in the JavaScript ecosystem.
