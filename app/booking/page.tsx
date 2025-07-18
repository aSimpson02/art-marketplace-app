"use client"

import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { ChevronLeftIcon } from "lucide-react-native"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native"
import { Calendar } from "react-native-calendars"

const gallerySpaces = [
  {
    id: 1,
    name: "Central Gallery Space",
    location: "Central Saint Martins",
    address: "Granary Building, 1 Granary Square, London N1C 4AA",
    capacity: 100,
    size: "200 sqm",
    hourlyRate: 45,
    dailyRate: 300,
    weeklyRate: 1800,
    image: require("../assets/placeholder.jpg"),
    amenities: ["wifi", "lighting", "security", "accessibility", "parking"],
    description: "Modern gallery space with excellent natural lighting and flexible layout options.",
    availability: "high",
    bookings: [{ date: "2024-02-15", type: "exhibition", title: "Student Showcase" }],
  },
]

export default function BookingScreen() {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedSpace, setSelectedSpace] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredSpaces = gallerySpaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <ScrollView className="bg-white h-full">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">Book a Gallery</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <TextInput
          placeholder="Search gallery spaces..."
          className="border rounded-lg px-4 py-2"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Gallery Listings */}
      {filteredSpaces.map((space) => (
        <TouchableOpacity
          key={space.id}
          className="mx-4 mb-6 border border-gray-200 rounded-lg overflow-hidden"
          onPress={() => {
            setSelectedSpace(space)
            setIsDialogOpen(true)
          }}
        >
          <Image source={space.image} className="w-full h-48" resizeMode="cover" />
          <View className="p-4">
            <Text className="text-lg font-semibold">{space.name}</Text>
            <Text className="text-sm text-gray-500">{space.location}</Text>
            <Text className="text-sm mt-1 text-gray-700">{space.description}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Booking Dialog */}
      {isDialogOpen && selectedSpace && (
        <TouchableWithoutFeedback onPress={() => setIsDialogOpen(false)}>
          <View className="absolute inset-0 bg-black bg-opacity-60 justify-center items-center z-50">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-xl p-6 w-[90%] max-h-[90%]">
                <Text className="text-lg font-bold mb-2">Book {selectedSpace.name}</Text>

                <Calendar
                  onDayPress={(day) => setSelectedDate(day.dateString)}
                  markedDates={
                    selectedDate
                      ? { [selectedDate]: { selected: true, selectedColor: "#000" } }
                      : undefined
                  }
                />

                <TouchableOpacity
                  className="bg-black mt-4 p-3 rounded-xl"
                  onPress={() => {
                    // TODO: Replace with your booking submission logic
                    console.log("Booked:", selectedSpace.name, "on", selectedDate)
                    setIsDialogOpen(false)
                  }}
                >
                  <Text className="text-white text-center">
                    Confirm {selectedDate ? `for ${selectedDate}` : "Date"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </ScrollView>
  )
}
