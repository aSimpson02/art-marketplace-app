import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Artwork = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
};

export default function ArtworkDetailScreen() {
  const { id } = useLocalSearchParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      setArtwork(data);
      setLoading(false);
    };

    if (id) fetchArtwork();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!artwork) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Artwork not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <Image
        source={{ uri: artwork.image_url }}
        className="w-full h-96"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-2xl font-bold mb-2 dark:text-white">{artwork.title}</Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-4">
          {artwork.description}
        </Text>

        <Text className="text-lg font-semibold mb-6 dark:text-white">
          ${artwork.price.toFixed(2)}
        </Text>

        <TouchableOpacity
          onPress={() => Alert.alert("Coming soon", "Stripe checkout will be added next!")}
          className="bg-black py-4 px-6 rounded"
        >
          <Text className="text-white text-center font-medium">Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
