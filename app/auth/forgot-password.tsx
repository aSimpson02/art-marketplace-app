// app/auth/forgot-password.tsx

import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleReset = () => {
    // TODO: Add actual reset logic
    console.log("Reset password for:", email)
    // Optionally navigate after submission:
    router.push("/auth/login/page")
  }

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Reset your password</Text>

      <Text className="text-sm mb-2">Enter your UAL email address:</Text>
      <TextInput
        className="border p-3 rounded-md mb-4"
        placeholder="your.email@arts.ac.uk"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        onPress={handleReset}
        className="bg-black p-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/auth/login/page")}
        className="mt-4"
      >
        <Text className="text-blue-600 text-center">Back to Login</Text>
      </TouchableOpacity>
    </View>
  )
}
