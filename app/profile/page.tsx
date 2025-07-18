import { Edit } from "lucide-react-native"
import { useState } from "react"
import { Image, Pressable, ScrollView, Text, View } from "react-native"

export default function ProfileMobile() {
  const [showFollowerCount, setShowFollowerCount] = useState(true)
  const stats = {
    followers: 234,
    following: 89,
    artworksSold: 12,
    totalEarnings: 1850,
    averageRating: 4.8,
  }

  const profileData = {
    name: "Sarah Chen",
    course: "Fine Art",
    year: "3rd Year",
    bio: "Passionate about abstract art and color theory.",
    location: "London, UK",
    website: "www.sarahchen-art.com",
    instagram: "@sarahchen_art",
  }

  return (
    <ScrollView className="bg-white min-h-screen px-4 py-6">
      {/* Header */}
      <View className="items-center mb-4">
        <Image
          source={{ uri: "https://placehold.co/128x128" }}
          className="w-32 h-32 rounded-full mb-2"
        />
        <Pressable className="flex-row items-center px-4 py-2 border rounded-full">
          <Edit size={16} />
          <Text className="ml-2">Edit Profile</Text>
        </Pressable>
      </View>

      {/* Name & Info */}
      <View className="mb-4 items-center">
        <Text className="text-2xl font-bold">{profileData.name}</Text>
        <Text className="text-gray-600">{profileData.course} • {profileData.year}</Text>
        <Text className="text-gray-500 text-center mt-2">{profileData.bio}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around my-6">
        <View className="items-center">
          <Text className="text-lg font-bold">{showFollowerCount ? stats.followers : "***"}</Text>
          <Text className="text-gray-500 text-sm">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold">{stats.following}</Text>
          <Text className="text-gray-500 text-sm">Following</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold">{stats.artworksSold}</Text>
          <Text className="text-gray-500 text-sm">Sold</Text>
        </View>
      </View>

      {/* Website + IG */}
      <View className="mt-4">
        <Text className="text-sm text-gray-500">🌐 {profileData.website}</Text>
        <Text className="text-sm text-gray-500">📸 {profileData.instagram}</Text>
      </View>
    </ScrollView>
  )
}

