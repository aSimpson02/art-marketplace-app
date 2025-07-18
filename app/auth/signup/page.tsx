"use client"

import { useRouter } from "expo-router"
import { Eye, EyeOff, Palette } from "lucide-react-native"
import React, { useState } from "react"
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    course: "",
    year: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.agreeToTerms) return
    console.log("Signup attempt:", formData)
    // Add signup logic
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="items-center mb-6">
        <Palette size={48} color="#6D28D9" />
        <Text className="text-2xl font-bold mt-2">Join UAL Marketplace</Text>
        <Text className="text-gray-500">Create your account to buy and sell art</Text>
      </View>

      <View className="space-y-4">
        {/* First + Last Name */}
        <View className="flex-row space-x-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-2"
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
          />
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-2"
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
          />
        </View>

        {/* Email */}
        <TextInput
          className="border border-gray-300 rounded-lg p-2"
          placeholder="UAL Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
        />

        {/* Password */}
        <View className="relative">
          <TextInput
            className="border border-gray-300 rounded-lg p-2 pr-10"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View className="relative">
          <TextInput
            className="border border-gray-300 rounded-lg p-2 pr-10"
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </TouchableOpacity>
        </View>

        {/* Course + Year */}
        <TextInput
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Course (e.g., Fine Art)"
          value={formData.course}
          onChangeText={(text) => handleInputChange("course", text)}
        />

        <TextInput
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Year (1st, 2nd, Masters, etc.)"
          value={formData.year}
          onChangeText={(text) => handleInputChange("year", text)}
        />

        {/* Terms Agreement */}
        <View className="flex-row items-center space-x-2">
          <Switch
            value={formData.agreeToTerms}
            onValueChange={(value) => handleInputChange("agreeToTerms", value)}
          />
          <Text className="text-sm text-gray-600">
            I agree to the Terms and Privacy Policy
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          className={`bg-black p-3 rounded-xl ${
            !formData.agreeToTerms ? "opacity-50" : ""
          }`}
          disabled={!formData.agreeToTerms}
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Create Account</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <TouchableOpacity onPress={() => router.push("/auth/login/page")}>
          <Text className="text-center text-sm text-blue-600 mt-4">
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

