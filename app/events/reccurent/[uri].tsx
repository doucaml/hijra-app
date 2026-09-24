import { useLocalSearchParams } from "expo-router/build/hooks";
import { ScrollView, Text, View } from "react-native";
import {
  EnrichedMarkdownText,
  type MarkdownStyle,
} from "react-native-enriched-markdown";
import {
  goodPracticesContent,
  PracticesKeyType,
} from "@/utils/reccurentEventsContent";

const markdownStyle: MarkdownStyle = {
  paragraph: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    lineHeight: 27,
    color: "#432917",
    marginTop: 0,
    marginBottom: 20,
  },
  h3: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 19,
    lineHeight: 27,
    color: "#613B20",
    marginTop: 28,
    marginBottom: 12,
  },
  list: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    lineHeight: 27,
    color: "#432917",
    bulletColor: "#9E5F33",
    bulletSize: 5,
    markerColor: "#9E5F33",
    gapWidth: 10,
    marginLeft: 8,
    itemSpacing: 8,
    marginTop: 0,
    marginBottom: 20,
  },
  strong: {
    fontFamily: "OpenSans-SemiBold",
    fontWeight: "normal",
    color: "#613B20",
  },
  em: {
    fontFamily: "OpenSans-Regular",
    fontStyle: "italic",
    color: "#9E5F33",
  },
  blockquote: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    lineHeight: 27,
    color: "#613B20",
    borderColor: "#BD713B",
    borderWidth: 2,
    gapWidth: 12,
    backgroundColor: "#F1DCCC",
    borderRadius: 4,
    padding: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  link: {
    fontFamily: "OpenSans-SemiBold",
    color: "#9E5F33",
    underline: true,
    backgroundColor: "transparent",
  },
  thematicBreak: {
    color: "#DEB190",
    height: 1,
    marginTop: 8,
    marginBottom: 24,
  },
};

export default function Screen() {
  const { uri } = useLocalSearchParams();
  const data = goodPracticesContent[uri as PracticesKeyType];

  return (
    <View className="flex-1 bg-brown-50 px-5 pt-5">
      <Text className="font-sans-semibold text-[28px] leading-9 text-brown-800">
        {data.title}
      </Text>
      <View className="mb-7 mt-4 h-px bg-brown-200" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        <EnrichedMarkdownText
          markdown={data.content}
          markdownStyle={markdownStyle}
          selectable
          allowTrailingMargin={false}
        />
      </ScrollView>
    </View>
  );
}
