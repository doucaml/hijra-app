import { Pressable, View } from "react-native";

export default function SwitchBtn({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) {
  return (
    <Pressable onPress={onChange} className={value === false ? "justify-center rounded-2xl w-14 h-8 bg-gray-300" : "justify-center rounded-2xl w-14 h-8 bg-brown-400"}>
        <View
          className={value === false ? "ml-1 size-6 bg-white rounded-full" : "self-end mr-1 size-6.5 bg-white rounded-full"}
        />
    </Pressable>
  );
}
