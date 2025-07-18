import { Text, View } from "react-native"
import { cn } from "../../lib/utils"

export function Badge({ children, className }: any) {
  return (
    <View className={cn("bg-gray-200 px-2 py-1 rounded-full", className)}>
      <Text className="text-xs text-gray-800">{children}</Text>
    </View>
  )
}
