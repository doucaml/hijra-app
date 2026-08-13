package expo.modules.appwidgetandroid.TodayDate

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.TextUnit
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

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val appDate = AppDate()

        provideContent {
            WidgetContent(appDate.dateStr, appDate.arMonthStr)
        }
    }

    @Composable
    fun WidgetContent(enDate: String, monthInArabic: String) {
        Column(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(background)
                .cornerRadius(20.dp)
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            TextContent(
                text = monthInArabic,
                color = accent,
                fontWeight = FontWeight.Bold,
                textFontSize = 26.sp
            )

            Spacer(modifier = GlanceModifier.height(3.dp))

            TextContent(
                text = "${enDate.uppercase()} AH",
                color = primaryText,
                fontWeight = FontWeight.Medium,
                textFontSize = 18.sp
            )
        }
    }

    @Composable
    private fun TextContent(
        text: String,
        fontWeight: FontWeight = FontWeight.Normal,
        color: ColorProvider = primaryText,
        textFontSize: TextUnit = 14.sp,
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
}
