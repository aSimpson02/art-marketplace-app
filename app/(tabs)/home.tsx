import Hello from '@/components/Hello';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white space-y-4 px-4">
      <Text className="text-2xl font-bold text-blue-600 text-center">
        Welcome to the Art Marketplace 🎨
      </Text>
      <Hello />
    </View>
  );
}
