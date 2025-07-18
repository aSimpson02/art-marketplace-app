import { Pressable, Text } from "react-native"
import { cn } from "@/lib/utils" // adjust if needed

export function Button({
  children,
  onPress,
  className,
  variant = "default",
}: {
  children: React.ReactNode
  onPress?: () => void
  className?: string
  variant?: "default" | "outline" | "destructive"
}) {
  const base = "px-4 py-2 rounded-md items-center justify-center"
  const variants = {
    default: "bg-black",
    outline: "border border-black",
    destructive: "bg-red-500",
  }

  return (
    <Pressable onPress={onPress} className={cn(base, variants[variant], className)}>
      <Text className="text-white font-medium">{children}</Text>
    </Pressable>
  )
}

