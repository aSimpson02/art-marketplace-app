// app/create/page.tsx
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function CreateGalleryScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [galleryType, setGalleryType] = useState('digital');
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({ title, description, galleryType, coverImage });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Create New Gallery</Text>

      <Text className="text-base font-semibold">Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Gallery Title"
        className="border border-gray-300 p-2 rounded mb-4"
      />

      <Text className="text-base font-semibold">Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Write a description..."
        multiline
        numberOfLines={4}
        className="border border-gray-300 p-2 rounded mb-4"
      />

      <Text className="text-base font-semibold">Gallery Type</Text>
      <View className="flex-row mb-4 space-x-2">
        {['digital', 'physical', 'hybrid'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setGalleryType(type)}
            className={`px-3 py-1 rounded border ${
              galleryType === type ? 'bg-blue-500 border-blue-600' : 'border-gray-300'
            }`}
          >
            <Text className="text-white">{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-base font-semibold mb-2">Cover Image</Text>
      {coverImage ? (
        <Image
          source={{ uri: coverImage }}
          className="w-full h-48 rounded mb-4"
          resizeMode="cover"
        />
      ) : null}
      <TouchableOpacity onPress={handleImagePick} className="bg-gray-200 p-2 rounded mb-6">
        <Text className="text-center">Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} className="bg-black py-3 rounded">
        <Text className="text-white text-center font-bold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
