// components/ui/select.tsx
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

export const Select = ({ selectedValue, onValueChange, items = [] }: {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string, value: string }[];
}) => (
  <View className="border border-gray-300 rounded mb-2">
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
)
