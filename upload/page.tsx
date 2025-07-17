// app/supplies/page.tsx

import { Clock, MapPin, Package } from "lucide-react-native"
import React, { useState } from "react"
import {
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native"
import { SelectList } from "react-native-dropdown-select-list"

const stores = [
  {
    id: 1,
    name: "Central Saint Martins Store",
    address: "Granary Building, 1 Granary Square, London N1C 4AA",
    phone: "020 7514 7000",
    hours: "Mon-Fri: 9:00-18:00, Sat: 10:00-16:00",
  },
  {
    id: 2,
    name: "London College of Fashion Store",
    address: "20 John Prince's St, London W1G 0BJ",
    phone: "020 7514 7400",
    hours: "Mon-Fri: 9:00-17:30, Sat: 10:00-15:00",
  },
  {
    id: 3,
    name: "Camberwell College Store",
    address: "45-65 Peckham Rd, London SE5 8UF",
    phone: "020 7514 6300",
    hours: "Mon-Fri: 9:00-17:00, Sat: 10:00-14:00",
  },
]

const supplies = [
  {
    id: 1,
    name: "Winsor & Newton Watercolor Set",
    category: "Painting",
    price: 45.99,
    stock: {
      "Central Saint Martins Store": 12,
      "London College of Fashion Store": 0,
      "Camberwell College Store": 8,
    },
    description: "Professional watercolor set with 24 colors",
  },
  // ... other items
]

export default function SuppliesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStore, setSelectedStore] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = ["all", "Painting", "Drawing", "Paper", "Sculpture", "Digital", "Textiles", "Photography"]

  const filteredSupplies = supplies.filter((supply) => {
    const matchesSearch =
      supply.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supply.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || supply.category === selectedCategory
    const hasStock = selectedStore === "all" || supply.stock[selectedStore] > 0
    return matchesSearch && matchesCategory && hasStock
  })

  return (
    <ScrollView className="p-4 bg-white dark:bg-black">
      <Text className="text-3xl font-bold mb-2">UAL Art Supplies</Text>
      <Text className="text-gray-500 mb-4">Check stock availability across UAL stores</Text>

      {/* Filters */}
      <View className="mb-4">
        <TextInput
          placeholder="Search supplies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="border px-4 py-2 rounded mb-2"
        />
        <SelectList
          data={categories.map((c) => ({ key: c, value: c }))}
          setSelected={setSelectedCategory}
          placeholder="Select Category"
        />
        <SelectList
          data={[{ key: "all", value: "All Stores" }, ...stores.map((s) => ({ key: s.name, value: s.name }))]}
          setSelected={setSelectedStore}
          placeholder="Select Store"
        />
      </View>

      {/* Supplies Grid */}
      {filteredSupplies.length > 0 ? (
        filteredSupplies.map((supply) => (
          <View key={supply.id} className="mb-4 border rounded p-4">
            <Text className="text-lg font-semibold mb-1">{supply.name}</Text>
            <Text className="text-gray-500 mb-1">{supply.description}</Text>
            <Text className="text-primary font-bold mb-2">\u00a3{supply.price}</Text>

            <Text className="text-sm font-semibold">Stock Availability:</Text>
            {Object.entries(supply.stock).map(([storeName, stock]) => (
              <View key={storeName} className="flex-row justify-between">
                <Text>{storeName.replace(" Store", "")}</Text>
                <Text className="text-gray-500">{stock}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <View className="items-center justify-center py-12">
          <Package size={40} color="gray" />
          <Text className="text-lg mt-2">No supplies found</Text>
        </View>
      )}

      {/* Store Locations */}
      <Text className="text-2xl font-bold mt-8 mb-2">Store Locations</Text>
      {stores.map((store) => (
        <View key={store.id} className="mb-4 border rounded p-4">
          <Text className="text-lg font-bold mb-1">{store.name}</Text>
          <View className="flex-row items-center gap-2">
            <MapPin size={16} color="gray" />
            <Text>{store.address}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Clock size={16} color="gray" />
            <Text>{store.hours}</Text>
          </View>
          <Text className="mt-1">📞 {store.phone}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
