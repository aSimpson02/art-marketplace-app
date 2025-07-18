import { supabase } from '@/lib/supabase';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UploadArtworkScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return Alert.alert("Error", "Please select an image first.");

    const filename = `${Date.now()}-artwork.jpg`;

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from('artworks')
      .upload(filename, decode(image.base64!), {
        contentType: 'image/jpeg',
      });

    if (uploadError) return Alert.alert("Upload failed", uploadError.message);

    // Get public URL
    const { data } = supabase.storage.from('artworks').getPublicUrl(filename);
    const publicUrl = data?.publicUrl;

    // Get user ID
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Insert artwork record
    const { error: insertError } = await supabase.from('artworks').insert([
      {
        title,
        description,
        image_url: publicUrl,
        price: parseFloat(price),
        artist_id: user?.id,
      },
    ]);

    if (insertError) return Alert.alert("DB error", insertError.message);

    Alert.alert("Success", "Artwork uploaded!");
    // router.push('/galleries');
    router.back();
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-2">Upload New Artwork</Text>

      <TextInput
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
        className="border px-4 py-2 mb-2"
      />

      <TextInput
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        className="border px-4 py-2 mb-2"
      />

      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={setPrice}
        value={price}
        className="border px-4 py-2 mb-2"
      />

      <TouchableOpacity onPress={pickImage} className="bg-gray-300 px-4 py-2 rounded mb-2">
        <Text>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: '100%', height: 200 }}
          className="mb-4 rounded"
        />
      )}

      <TouchableOpacity
        onPress={handleUpload}
        className="bg-black py-3 rounded"
      >
        <Text className="text-white text-center">Upload Artwork</Text>
      </TouchableOpacity>
    </View>
  );
}
