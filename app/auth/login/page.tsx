import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // toggle between login and signup

  const handleAuth = async () => {
    const authFn = isSignUp
      ? supabase.auth.signUp
      : supabase.auth.signInWithPassword;

    const { error } = await authFn({ email, password });

    if (error) {
      Alert.alert("Auth Error", error.message);
    } else {
      Alert.alert("Success", isSignUp ? "Check your email to verify!" : "Logged in!");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black px-6">
      <Text className="text-2xl font-bold mb-6 text-black dark:text-white">
        {isSignUp ? "Create Account" : "Log In"}
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mb-4 text-black dark:text-white"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mb-6 text-black dark:text-white"
      />

      <TouchableOpacity
        onPress={handleAuth}
        className="bg-black dark:bg-white px-4 py-2 rounded-lg w-full"
      >
        <Text className="text-white dark:text-black text-center font-medium">
          {isSignUp ? "Sign Up" : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} className="mt-4">
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {isSignUp
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

