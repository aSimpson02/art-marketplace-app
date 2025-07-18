import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { router } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react-native"

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    })
    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri)
      setImages([...images, ...uris])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] })
      setCurrentTag("")
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", { ...formData, images })
    // You can replace with your form POST logic
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white dark:bg-black"
    >
      <ScrollView className="p-4">
        <Text className="text-3xl font-bold mb-4 text-black dark:text-white">List Your Artwork</Text>

        {/* Image Upload */}
        <View className="mb-6">
          <Text className="font-semibold mb-2 text-black dark:text-white">Upload Images</Text>
          <Button onPress={pickImage}>Choose from Gallery</Button>
          <View className="flex-row flex-wrap mt-4 gap-2">
            {images.map((uri, index) => (
              <View key={index} className="relative w-[100px] h-[100px]">
                <Image
                  source={{ uri }}
                  className="w-full h-full rounded-md"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                >
                  <X size={16} color="white" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <View className="mb-6 space-y-4">
          <View>
            <Text className="text-black dark:text-white mb-1">Title *</Text>
            <TextInput
              placeholder="Artwork title"
              value={formData.title}
              onChangeText={(val) => setFormData({ ...formData, title: val })}
              className="border border-gray-300 rounded-md px-4 py-2 dark:bg-white dark:text-black"
            />
          </View>

          <View>
            <Text className="text-black dark:text-white mb-1">Description *</Text>
            <TextInput
              placeholder="Describe your artwork..."
              value={formData.description}
              onChangeText={(val) => setFormData({ ...formData, description: val })}
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-md px-4 py-2 h-24 dark:bg-white dark:text-black"
            />
          </View>

          <View>
            <Text className="text-black dark:text-white mb-1">Price (£) *</Text>
            <TextInput
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={formData.price}
              onChangeText={(val) => setFormData({ ...formData, price: val })}
              className="border border-gray-300 rounded-md px-4 py-2 dark:bg-white dark:text-black"
            />
          </View>

          <View>
            <Text className="text-black dark:text-white mb-1">Category *</Text>
            <TextInput
              placeholder="e.g. Painting"
              value={formData.category}
              onChangeText={(val) => setFormData({ ...formData, category: val })}
              className="border border-gray-300 rounded-md px-4 py-2 dark:bg-white dark:text-black"
            />
          </View>
        </View>

        {/* Tags */}
        <View className="mb-6">
          <Text className="text-black dark:text-white mb-1">Tags</Text>
          <View className="flex-row gap-2">
            <TextInput
              placeholder="Add tag"
              value={currentTag}
              onChangeText={setCurrentTag}
              onSubmitEditing={addTag}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 dark:bg-white dark:text-black"
            />
            <Button onPress={addTag}>Add</Button>
          </View>
          <View className="flex-row flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Pressable
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex-row items-center"
                onPress={() =>
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter((t) => t !== tag),
                  })
                }
              >
                <Text className="text-black dark:text-white mr-1">{tag}</Text>
                <X size={12} color="gray" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Submit */}
        <View className="flex-row gap-4 mt-4">
          <Button onPress={handleSubmit} className="flex-1">
            Submit
          </Button>
          <Button variant="outline" className="flex-1">
            Save Draft
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
