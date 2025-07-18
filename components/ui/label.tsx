import { Text } from "react-native"

export const Label = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-sm text-gray-600 mb-1">{children}</Text>
)
