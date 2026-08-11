package expo.modules.appwidgetandroid.GeneralCalendar

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.cornerRadius
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.layout.Alignment
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.layout.size
import androidx.glance.preview.ExperimentalGlancePreviewApi
import androidx.glance.preview.Preview
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextAlign
import androidx.glance.text.TextStyle
import androidx.glance.unit.ColorProvider
import expo.modules.appwidgetandroid.data.AppDate

class Widget : GlanceAppWidget() {
    private val background = ColorProvider(
        day = Color(0xFFFFF9ED),
        night = Color(0xFFF1ECE2)
    )
    private val accent = ColorProvider(
        day = Color(0xFFB87828),
        night = Color(0xFFA7671F)
    )
    private val primaryText = ColorProvider(
        day = Color(0xFF203A36),
        night = Color(0xFF203A36)
    )
    private val secondaryText = ColorProvider(
        day = Color(0xFF6B8179),
        night = Color(0xFF687B73)
    )
    private val todayText = ColorProvider(
        day = Color(0xFFFFF9ED),
        night = Color(0xFFF1ECE2)
    )

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val appDate = AppDate()

        provideContent {
            WidgetContent(appDate)
        }
    }

    @Composable
    fun WidgetContent(appDate: AppDate) {
        Column(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(background)
                .cornerRadius(20.dp)
                .padding(horizontal = 10.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            CalendarHeader(appDate.enMonthStr, appDate.arMonthStr)

            Spacer(modifier = GlanceModifier.height(8.dp))

            CalendarTable(
                daysInitials = appDate.daysInitials,
                daysList = appDate.getDaysList(),
                currentDayNumber = appDate.dayNumber
            )
        }
    }

    @Composable
    private fun CalendarHeader(enMonth: String, arMonth: String) {
        Column(
            modifier = GlanceModifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            TextContent(
                text = "${enMonth.uppercase()} · $arMonth",
                color = primaryText,
                fontWeight = FontWeight.Bold,
                textFontSize = 16.sp
            )
        }
    }

    @Composable
    private fun CalendarTable(
        daysInitials: List<String>,
        daysList: MutableList<Int?>,
        currentDayNumber: Int
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Row(horizontalAlignment = Alignment.CenterHorizontally) {
                daysInitials.forEach { letter ->
                    TextContent(
                        text = letter,
                        color = secondaryText,
                        fontWeight = FontWeight.Bold,
                        textFontSize = 11.sp,
                        modifier = GlanceModifier.size(22.dp)
                    )
                }
            }

            Spacer(modifier = GlanceModifier.height(3.dp))

            daysList.chunked(7).forEach { week ->
                Row(horizontalAlignment = Alignment.CenterHorizontally) {
                    week.forEach { day ->
                        DayCell(
                            day = day,
                            isToday = day == currentDayNumber
                        )
                    }
                }
            }
        }
    }

    @Composable
    private fun DayCell(day: Int?, isToday: Boolean) {
        TextContent(
            text = day?.toString() ?: "",
            color = if (isToday) todayText else primaryText,
            fontWeight = if (isToday) FontWeight.Bold else FontWeight.Normal,
            textFontSize = 11.sp,
            modifier = GlanceModifier
                .size(22.dp)
                .then(
                    if (isToday) {
                        GlanceModifier
                            .background(accent)
                            .cornerRadius(8.dp)
                    } else {
                        GlanceModifier
                    }
                )
        )
    }

    @Composable
    private fun TextContent(
        text: String,
        color: ColorProvider = primaryText,
        fontWeight: FontWeight = FontWeight.Normal,
        textFontSize: androidx.compose.ui.unit.TextUnit = 14.sp,
        modifier: GlanceModifier = GlanceModifier
    ) {
        Text(
            text = text,
            style = TextStyle(
                color = color,
                fontWeight = fontWeight,
                fontSize = textFontSize,
                textAlign = TextAlign.Center
            ),
            modifier = modifier
        )
    }

    @OptIn(ExperimentalGlancePreviewApi::class)
    @Composable
    @Preview(widthDp = 240, heightDp = 240)
    fun WidgetPreview() {
        val appDate = AppDate()

        Column(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(Color(0xFFE7E0D4))
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            WidgetContent(appDate)
        }
    }
}
