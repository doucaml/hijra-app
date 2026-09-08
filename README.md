# Hijra

Hijra is a mobile application for reconnecting with Hijri calendar. I had the idea of building it after having read the article of the Yaqeen Insitute about the history of the calendar and its past political importance, ([link of the article](https://yaqeeninstitute.org/read/paper/the-months-ordained-by-allah-reviving-the-islamic-calendar)). The goal throught this app is to better known islam history and celebrations but also having a way to reconnect with hijri calendar and some pratices associated to certain dates.

# Features

The features for now are :

- consulting hijri calendar and having the gregorian / hijri equivalent for each date
- widget displaying the actual date or the month table (only in android for now)
- notifications of recommended practices for some day (ie. recommended monday fasting)
- description of a celebration / event

# Tech Stack

The application is built with React Native with Expo, with some notables libraries in addition :

- Lucide React Native for icons
- expo notifications for notifications
- Expo Modules for adding custom libraries built with native code

As there is no standard way presently to add widget with only react native, android widgets are built on Kotlin with Android Jetpack Glance. The java implementation of hijri calendar is also used and exposed throught a library for hijri dates as nothing as polished exist in JavaScript ecosystem.
