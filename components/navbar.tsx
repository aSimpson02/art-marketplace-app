// Mobile-Optimized React Native Navbar (Expo + NativeWind + Expo Router)
"use client";

import { useRouter } from "expo-router";
import { Bell, Heart, Menu, Palette, Search, ShoppingCart, User } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "../../components/ui/badge";

export function NavbarMobile() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View className="w-full bg-white border-b border-gray-200">
      <View className="flex-row items-center justify-between px-4 py-3">
        {/* Left: Menu and Logo */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/")}
            className="flex-row items-center">
            <Palette size={24} color="#4F46E5" />
            <Text className="text-xl font-bold ml-2">UAL</Text>
          </TouchableOpacity>
        </View>

        {/* Right Icons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <Search size={22} />
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <Heart size={22} />
            <Badge className="absolute -top-1 -right-1 text-xs">3</Badge>
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <ShoppingCart size={22} />
            <Badge className="absolute -top-1 -right-1 text-xs">2</Badge>
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile")}> 
            <User size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {menuOpen && (
        <ScrollView className="px-4 pb-3">
          <TouchableOpacity onPress={() => router.push("/search")}>
            <Text className="text-lg py-2">Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/galleries")}>
            <Text className="text-lg py-2">Galleries</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/supplies")}>
            <Text className="text-lg py-2">Supplies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/jobs")}>
            <Text className="text-lg py-2">Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/upload")}>
            <Text className="text-lg py-2">Sell Art</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text className="text-lg py-2">Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

export default NavbarMobile;
