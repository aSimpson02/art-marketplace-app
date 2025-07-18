import React from "react"
import { Text, View, ViewProps } from "react-native"

export function Card({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View className={`bg-white rounded-lg shadow-md p-4 ${className || ""}`} {...props}>
      {children}
    </View>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <View className="mb-2">{children}</View>
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-lg font-bold">{children}</Text>
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <Text className="text-sm text-gray-500">{children}</Text>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <View className="my-2">{children}</View>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <View className="mt-2">{children}</View>
}
