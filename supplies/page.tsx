import { Navbar } from "@/components/Navbar"; // custom mobile navbar
import { Button } from "@/components/ui/Button"; // custom Button
import { cn } from "@/lib/utils"; // if you're using Tailwind merge helpers
import { AlertTriangle, Clock, MapPin } from "lucide-react-native"
import { useState } from "react"
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native"

const stores = [
  {
    id: 1,
    name: "Central Saint Martins Store",
    address: "Granary Building, 1 Granary Square, London N1C 4AA",
    phone: "020 7514 7000",
    hours: "Mon-Fri: 9:00-18:00, Sat: 10:00-16:00",
    image: "https://placehold.co/300x200",
  },
  // Add others...
]

const supplies = [
  {
    id: 1,
    name: "Watercolor Set",
    category: "Painting",
    price: 45.99,
    description: "24-color set",
    stock: {
      "Central Saint Martins Store": 12,
      "London College of Fashion Store": 0,
      "Camberwell College Store": 8,
    },
    image: "https://placehold.co/200x200",
  },
  // Add others...
]

export default function SuppliesScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState<"supplies" | "stores">("supplies")

  const filteredSupplies = supplies.filter((supply) => {
    return supply.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: "Out of Stock", variant: "bg-red-100 text-red-800" }
    if (stock <= 5) return { status: "Low Stock", variant: "bg-yellow-100 text-yellow-800" }
    return { status: "In Stock", variant: "bg-green-100 text-green-800" }
  }

  return (
    <ScrollView className="bg-white dark:bg-black min-h-screen">
      <Navbar />
      <View className="px-4 py-6">
        <Text className="text-3xl font-bold mb-2">UAL Art Supplies</Text>
        <Text className="text-gray-600 dark:text-gray-300 mb-4">
          Check stock availability across UAL stores
        </Text>

        {/* Tab Selector */}
        <View className="flex-row space-x-2 mb-4">
          <Pressable onPress={() => setSelectedTab("supplies")} className={cn("px-4 py-2 rounded-full", selectedTab === "supplies" ? "bg-black text-white" : "bg-gray-200")}>
            <Text>Supplies</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedTab("stores")} className={cn("px-4 py-2 rounded-full", selectedTab === "stores" ? "bg-black text-white" : "bg-gray-200")}>
            <Text>Stores</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        {selectedTab === "supplies" && (
          <View className="mb-6">
            <TextInput
              placeholder="Search supplies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </View>
        )}

        {/* Supplies List */}
        {selectedTab === "supplies" && (
          <View className="space-y-4">
            {filteredSupplies.map((item) => (
              <View key={item.id} className="border border-gray-200 rounded-lg p-4">
                <Image source={{ uri: item.image }} className="w-full h-40 rounded-md mb-2" />
                <Text className="text-xl font-semibold">{item.name}</Text>
                <Text className="text-gray-500 mb-1">{item.description}</Text>
                <Text className="text-primary text-lg font-bold mb-2">£{item.price}</Text>

                {Object.entries(item.stock).map(([store, stock]) => {
                  const status = getStockStatus(stock)
                  return (
                    <View key={store} className="flex-row justify-between items-center mt-1">
                      <Text className="text-sm">{store.replace(" Store", "")}</Text>
                      <Text className={`text-xs px-2 py-1 rounded ${status.variant}`}>{status.status}</Text>
                    </View>
                  )
                })}
              </View>
            ))}
          </View>
        )}

        {/* Store Cards */}
        {selectedTab === "stores" && (
          <View className="space-y-6">
            {stores.map((store) => (
              <View key={store.id} className="border border-gray-200 rounded-lg">
                <Image source={{ uri: store.image }} className="w-full h-40 rounded-t-md" />
                <View className="p-4 space-y-2">
                  <Text className="text-xl font-bold">{store.name}</Text>
                  <View className="flex-row items-start gap-2">
                    <MapPin size={16} className="text-gray-500 mt-1" />
                    <Text className="text-sm">{store.address}</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <Text className="text-sm">{store.hours}</Text>
                  </View>
                  <Text className="text-sm text-gray-700">📞 {store.phone}</Text>
                  <Button label="Get Directions" />
                </View>
              </View>
            ))}

            <View className="bg-orange-100 border-l-4 border-orange-400 p-4 rounded-md mt-6">
              <View className="flex-row items-start gap-2">
                <AlertTriangle size={20} className="text-orange-600 mt-1" />
                <View>
                  <Text className="font-semibold text-orange-800 mb-1">Important Notice</Text>
                  <Text className="text-sm text-orange-700">
                    Stock levels may vary. Call ahead to confirm availability. UAL discounts apply with student ID.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
