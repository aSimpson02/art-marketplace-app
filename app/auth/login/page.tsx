import { useRouter } from "expo-router"
import { Eye, EyeOff, Palette } from "lucide-react-native"
import React, { useState } from "react"
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log("Login attempt:", { email, password })
    // Handle login logic here
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Header */}
      <View className="items-center mb-6">
        <Palette size={48} color="#6D28D9" />
        <Text className="text-2xl font-bold mt-2">Welcome Back</Text>
        <Text className="text-gray-500 text-center">Sign in to your UAL Marketplace account</Text>
      </View>

      {/* Inputs */}
      <View className="space-y-4">
        <TextInput
          className="border border-gray-300 rounded-lg p-2"
          placeholder="UAL Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View className="relative">
          <TextInput
            className="border border-gray-300 rounded-lg p-2 pr-10"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-1 mb-4"
          onPress={() => router.push("/auth/forgot-password")}
        >
          <Text className="text-sm text-blue-600">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black p-3 rounded-xl"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View className="my-8">
        <Text className="text-center text-sm text-gray-500">Or continue with</Text>
      </View>

      {/* Social buttons */}
      <View className="space-y-2">
        <TouchableOpacity className="border border-gray-300 p-3 rounded-xl flex-row items-center justify-center">
          <Text className="ml-2 text-sm font-semibold">Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-gray-300 p-3 rounded-xl flex-row items-center justify-center">
          <Text className="ml-2 text-sm font-semibold">Continue with Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <TouchableOpacity onPress={() => router.push("/auth/signup/page")}>
        <Text className="text-center text-sm text-blue-600 mt-6">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
