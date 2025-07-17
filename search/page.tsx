import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { router } from "expo-router"
import { Heart, SlidersHorizontal } from "lucide-react-native"
import { useState } from "react"
import { Image, ScrollView, Text, TextInput, View } from "react-native"

const artworks = [
  { id: 1, title: "Abstract Dreams", artist: "Sarah Chen", price: 150, likes: 24, category: "Painting" },
  { id: 2, title: "Urban Sketches", artist: "Marcus Johnson", price: 75, likes: 18, category: "Drawing" },
  { id: 3, title: "Digital Portraits", artist: "Emma Rodriguez", price: 200, likes: 32, category: "Digital Art" },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <ScrollView className="bg-white dark:bg-black min-h-screen">
      <Navbar />

      <View className="px-4 py-6">
        <Text className="text-2xl font-bold mb-4">Explore Artworks</Text>

        <View className="flex flex-col gap-4 mb-6">
          <View className="relative">
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2"
              placeholder="Search artworks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View className="flex flex-row gap-2">
            <Button variant="outline" onPress={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={16} /> Filters
            </Button>
          </View>
        </View>

        <Text className="text-gray-500 dark:text-gray-400 mb-4">Showing {artworks.length} results</Text>

        <View className="flex flex-col gap-4">
          {artworks.map((artwork) => (
            <Card key={artwork.id}>
              <View className="rounded-lg overflow-hidden">
                <Image
                  source={{ uri: "https://via.placeholder.com/300" }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
              </View>
              <View className="p-4">
                <Text className="text-lg font-semibold mb-1">{artwork.title}</Text>
                <Text className="text-sm text-gray-500 mb-1">by {artwork.artist}</Text>
                <Badge>{artwork.category}</Badge>
                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-primary font-bold text-xl">£{artwork.price}</Text>
                  <View className="flex-row items-center">
                    <Heart size={16} className="mr-1 text-muted-foreground" />
                    <Text className="text-sm text-muted-foreground">{artwork.likes}</Text>
                  </View>
                </View>
              </View>
              <Button onPress={() => router.push(`/artwork/${artwork.id}`)} className="m-4">
                View Details
              </Button>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
