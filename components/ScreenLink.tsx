import { Href, Link } from "expo-router";
import { Text } from "react-native"

export default function ScreenLink({ href, title }: { href: Href; title: string }) {
  return (
    <Link href={href} className="p-3 my-1 rounded-lg bg-gray-200">
      <Text>{title}</Text>
    </Link>
  );
}
