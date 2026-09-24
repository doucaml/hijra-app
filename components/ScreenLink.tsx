import { Href, Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";

export default function ScreenLink({
  href,
  title,
}: {
  href: Href;
  title: string;
}) {
  return (
    <Link href={href}>
      <View className="w-full flex-row justify-between items-center p-2">
        <Text className="align-middle font-sans text-base text-brown-800">
          {title}
        </Text>
        <ChevronRight color="#CB8655" />
      </View>
    </Link>
  );
}
