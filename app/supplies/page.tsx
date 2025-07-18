import { Badge } from "@/components/ui/badge"
import React, { useState } from "react"
import { ScrollView, Text, TextInput, View } from "react-native"

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
]

const supplies = [
  {
    id: 1,
    name: "Watercolor Set",
    category: "Painting",
    price: 45.99,
    description: "24 pro colors",
    stock: {
      "Central Saint Martins Store": 12,
      "London College of Fashion Store": 0,
    },
  },
  {
    id: 2,
    name: "Drawing Paper A3",
    category: "Paper",
    price: 18.5,
    description: "160gsm, 50 sheets",
    stock: {
      "Central Saint Martins Store": 25,
      "London College of Fashion Store": 15,
    },
  },
]

export default function SuppliesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = supplies.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ScrollView className="p-4 bg-white dark:bg-black min-h-screen">
      <Text className="text-2xl font-bold mb-4 text-black dark:text-white">UAL Art Supplies</Text>

      <TextInput
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 dark:bg-white dark:text-black"
        placeholder="Search supplies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filtered.map((item) => (
        <View key={item.id} className="mb-4 border p-4 rounded-xl bg-white dark:bg-neutral-900">
          <Text className="text-lg font-semibold text-black dark:text-white">{item.name}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-300">{item.description}</Text>
          <Text className="text-primary text-xl font-bold mt-2">£{item.price}</Text>
          <Badge>{item.category}</Badge>
        </View>
      ))}

      {filtered.length === 0 && (
        <Text className="text-center text-gray-500 mt-8">No results found.</Text>
      )}
    </ScrollView>
  )
}

