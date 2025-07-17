import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"

const galleryData = {
  title: "Contemporary Expressions",
  curator: { name: "Sarah Chen" },
  artworks: [
    {
      id: 1,
      title: "Digital Dreams",
      artist: "Emma Rodriguez",
      image: "https://via.placeholder.com/300x300",
      description: "An exploration of digital consciousness.",
      price: 200,
    },
    {
      id: 2,
      title: "Urban Reflections",
      artist: "Marcus Johnson",
      image: "https://via.placeholder.com/300x300",
      description: "City life captured through street photography.",
      price: 150,
    },
  ],
}

export default function GalleryDetailScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const router = useRouter()

  const artwork = galleryData.artworks[currentIndex]

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-bold">{galleryData.title}</Text>
      </View>

      {/* Artwork Image */}
      <Image source={{ uri: artwork.image }} className="w-full h-80" resizeMode="cover" />

      {/* Info Section */}
      <View className="p-4 space-y-2">
        <Text className="text-lg font-bold">{artwork.title}</Text>
        <Text className="text-gray-600">by {artwork.artist}</Text>
        <Text className="text-gray-800 mt-2">{artwork.description}</Text>
        <Text className="text-primary font-bold text-lg mt-2">£{artwork.price}</Text>

        {/* Navigation */}
        <View className="flex-row justify-between items-center mt-4">
          <TouchableOpacity onPress={() => setCurrentIndex((currentIndex - 1 + galleryData.artworks.length) % galleryData.artworks.length)}>
            <Ionicons name="chevron-back-circle" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Ionicons name={liked ? "heart" : "heart-outline"} size={28} color={liked ? "red" : "black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentIndex((currentIndex + 1) % galleryData.artworks.length)}>
            <Ionicons name="chevron-forward-circle" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
