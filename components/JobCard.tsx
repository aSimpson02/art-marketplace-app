import { Text, View } from "react-native"

export function JobCard() {
  return (
    <View className="p-4 border rounded-lg bg-white shadow-sm mb-4">
      <Text className="text-lg font-semibold">Job Title</Text>
      <Text className="text-gray-500">Company • Remote</Text>
      <Text className="mt-2 text-sm text-gray-700">Short description goes here...</Text>
    </View>
  )
}
