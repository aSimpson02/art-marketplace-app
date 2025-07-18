import { Pressable, Text } from "react-native"
import { cn } from "../../lib/utils"; // if you use Tailwind-style className utility

export function Button({ children, onPress, className }: any) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "bg-black px-4 py-2 rounded-lg items-center justify-center",
        className
      )}
    >
      <Text className="text-white font-medium">{children}</Text>
    </Pressable>
  )
}
