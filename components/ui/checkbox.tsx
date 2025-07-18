import { Pressable, View } from "react-native";

export const Checkbox = ({ value, onChange }: { value: boolean; onChange: (val: boolean) => void }) => {
  return (
    <Pressable onPress={() => onChange(!value)} className="h-5 w-5 border rounded border-gray-400 items-center justify-center">
      {value && <View className="bg-black w-3 h-3" />}
    </Pressable>
  )
}
