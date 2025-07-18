import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type Artwork = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
};

export default function GalleriesScreen() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase.from('artworks').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error loading artworks:', error);
      else setArtworks(data || []);
      setLoading(false);
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Explore Galleries</Text>

      {artworks.map((artwork) => (
        <TouchableOpacity
            key={artwork.id}
            onPress={() => router.push({ pathname: '/galleries/[id]', params: { id: artwork.id } })}
            className="mb-6 rounded-lg overflow-hidden border border-gray-300"
        >
            <Image
            source={{ uri: artwork.image_url }}
            className="w-full h-60"
            resizeMode="cover"
            />
            <View className="p-4 bg-white">
            <Text className="text-lg font-bold">{artwork.title}</Text>
            <Text className="text-gray-500">${artwork.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
))}


      {artworks.length === 0 && (
        <Text className="text-gray-500 text-center mt-8">No artworks yet. Upload some!</Text>
      )}
    </ScrollView>
  );
}
