import { Text, View } from "react-native"
import { cn } from "@/lib/utils" // adjust path if needed

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={cn("bg-gray-200 px-2 py-1 rounded-full", className)}>
      <Text className="text-xs text-gray-800">{children}</Text>
    </View>
  )
}
