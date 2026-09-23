import { useLocalSearchParams } from "expo-router/build/hooks";
import { View, Text, ScrollView } from "react-native";
import { EnrichedMarkdownText } from "react-native-enriched-markdown";
import {
  goodPracticesContent,
  PracticesKeyType,
} from "@/utils/goodPracticesContent";

export default function Screen() {
  const { uri } = useLocalSearchParams();
  const data = goodPracticesContent[uri as PracticesKeyType];

  return (
    <View className="flex-1 p-2">
      <Text className="text-2xl font-semibold text-center">{data.title}</Text>

      <View className="my-4" />

      <ScrollView>
        <EnrichedMarkdownText markdown={data.content} />
      </ScrollView>
    </View>
  );
}
