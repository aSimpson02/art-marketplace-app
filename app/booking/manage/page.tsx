import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const pendingBookings = [
  {
    id: 1,
    eventTitle: "Contemporary Art Showcase",
    spaceName: "Central Gallery Space",
    bookedBy: "Sarah Chen",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    attendees: 75,
    totalCost: 1200,
  },
  // ...more
]

export default function ManageBookingsScreen() {
  const [filter, setFilter] = useState("pending")

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-bold mb-4">Booking Management</Text>

      {pendingBookings.map((booking) => (
        <View key={booking.id} className="mb-4 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
          <Text className="text-lg font-semibold">{booking.eventTitle}</Text>
          <Text className="text-sm text-gray-500">{booking.spaceName}</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-sm text-gray-600">By: {booking.bookedBy}</Text>
            <Text className="text-sm text-gray-600">£{booking.totalCost}</Text>
          </View>
          <View className="flex-row mt-4 space-x-2">
            <Button className="flex-1 bg-green-500" onPress={() => console.log("Approve", booking.id)}>
              Approve
            </Button>
            <Button className="flex-1 bg-red-500" onPress={() => console.log("Reject", booking.id)}>
              Reject
            </Button>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
