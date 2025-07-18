import { useLocalSearchParams } from "expo-router"
import { Image, ScrollView, Text, View } from "react-native"
import { artworks } from "@/lib/data/artworks"

export default function ArtworkDetailPage() {
  const { id } = useLocalSearchParams()
  const artwork = artworks.find((a) => a.id === Number(id))

  if (!artwork) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">Artwork not found</Text>
      </View>
    )
  }

  return (
    <ScrollView className="bg-white dark:bg-black px-4 py-6">
      <Image
        source={{ uri: "https://via.placeholder.com/600" }}
        className="w-full h-64 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold text-black dark:text-white mb-1">{artwork.title}</Text>
      <Text className="text-lg text-gray-500 dark:text-gray-300 mb-4">by {artwork.artist}</Text>

      <View className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-full self-start mb-4">
        <Text className="text-blue-800 dark:text-blue-100 text-sm">{artwork.category}</Text>
      </View>

      <Text className="text-xl font-bold text-black dark:text-white mb-2">£{artwork.price}</Text>
      <Text className="text-base text-gray-600 dark:text-gray-400"> {artwork.likes} likes</Text>
    </ScrollView>
  )
}
