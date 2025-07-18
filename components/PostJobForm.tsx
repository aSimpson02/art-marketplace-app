import { Button, Text, TextInput, View } from "react-native"

export function PostJobForm({ onClose }: { onClose: () => void }) {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-xl font-bold mb-2">Post a Job</Text>
      <TextInput className="border rounded px-3 py-2 mb-3" placeholder="Job Title" />
      <TextInput className="border rounded px-3 py-2 mb-3" placeholder="Description" multiline numberOfLines={4} />
      <Button title="Submit" onPress={onClose} />
    </View>
  )
}
