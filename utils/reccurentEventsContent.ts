const jumuahPrayer = {
  title: "Jumu'ah prayer",
  content: `
  Friday is the most virtuous day of the week in Islam, designated for communal worship, spiritual renewal, and reflection

  ### Core Rulings & Format
  * **Obligation**: Mandatory for adult, resident Muslim men who are free of valid excuses

  * **Format**: Consists of a two-part sermon (khutbah) followed by two audible units (rak'at) of congregational prayer, which replaces the standard Dhuhr prayer

  * **Sunnah Prayers**: It is recommended to pray either two rak'at at home or four rak'at in the mosque after the main prayer

  ### Recommended Acts

  * **Physical Preparation**: Perform a full bath (ghusl), apply fragrance, use the siwak, and wear clean, preferably white clothes

  * **Early Arrival**: Walk calmly to the mosque early before the Imam ascends the pulpit

  * **Mosque Manners**: Pray two light units of greeting the mosque upon entering, avoid stepping over people, and maintain complete silence during the khutbah

  ### Recommended Daily Devotions

  * **Reciting Surah Al-Kahf**: Shines a spiritual light for the reader from one Friday to the next

  * **Invoking Blessings**: Frequently sending prayers and salutations upon the Prophet throughout the day and night

  * **Supplication**: Seeking the special hour of acceptance (Sa'at al-Ijabah), particularly in the late afternoon before sunset
`,
};

const mondayAndThursdayFasting = {
  title: "Monday and Thursday Fasting",
  content: `
  Fasting on Mondays and Thursdays is a confirmed Sunnah observed weekly throughout the year

  ### Core Virtues & Reasons

  * **Presentation of Deeds**

    The Prophet explained that human actions are presented to Allah every Monday and Thursday, and he favored having his deeds raised while in a state of fasting

  * **Forgiveness & Mercy**

    On these two days, Allah grants forgiveness to every Muslim who associates no partners with Him, except two individuals between whom there is mutual hostility until they reconcile

  * **Special Significance of Monday**

  When asked about fasting on Monday, the Prophet stated: *“That is the day on which I was born, and the day on which revelation was sent down to me”*

  ### Key Takeaways & Practice

  * **Regularity**: The Prophet was consistent in observing these two days every week

  * **Monthly Reward**: Fasting Mondays and Thursdays throughout the month amounts to eight days of voluntary fasting per month
`,
};

const whiteDays = {
  title: "White days",
  content: `
  The voluntary fast of the "White Days" (Ayyam al-Bid) represents an established monthly Prophetic practice (Sunnah) that combines regular spiritual discipline with immense divine reward

  ### 1. Definition and Timing

  * **Specific Days**: The White Days correspond specifically to the **13th, 14th, and 15th** of every month in the Islamic lunar calendar

  * **Why They Are Called "White"**: They are designated as such because the moon is at its fullest and brightest, illuminating the entire night from dusk to dawn

  ### 2. Virtues and Spiritual Rewards

  * **Equivalent to a Lifetime of Fasting (Siyam ad-Dahr)**

  The Prophet taught that fasting three days every month earns the spiritual reward of fasting throughout one's entire life

  This multiplied reward is grounded in the divine principle where every good deed is credited tenfold: fasting 3 days equals 30 days of reward (a full month), and maintaining it across the twelve months equals a full year of fasting

  * **A Cherished Prophetic Counsel**

  The Prophet specifically enjoined this practice upon several companions, including Abou Dharr and Abou Hourayra, instructing them never to abandon the fast of three days each month throughout their lifetimes

  ### 3. Practical Rules and Flexibility

  * **Primary Recommendation**

  Fasting the 13th, 14th, and 15th is the optimal fulfillment of the monthly three-day fast

  * **Flexibility in Scheduling**

  If one is unable to fast these exact dates due to travel, illness, or other commitments, fasting any other three days—whether consecutive or spread throughout the month—still attains the reward of the three-day monthly fast

  * **Exceptions**

  During the month of Dhou al-Hijjah, the 13th day is one of the Days of Tachriq, on which fasting is prohibited; one who intends to fast three days in this month selects other permissible days instead
`,
};

export const goodPracticesContent = {
  "jumuah-prayer": jumuahPrayer,
  "monday-and-thursday-fasting": mondayAndThursdayFasting,
  "white-days": whiteDays,
};

export type PracticesKeyType = keyof typeof goodPracticesContent;
