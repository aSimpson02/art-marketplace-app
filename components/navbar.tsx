"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "expo-router";
import {
    Bell,
    Heart,
    Menu,
    Palette,
    Search,
    ShoppingCart,
    User,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NavbarMobile() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Explore", path: "/search" },
    { label: "Galleries", path: "/galleries" },
    { label: "Supplies", path: "/supplies" },
    { label: "Jobs", path: "/jobs" },
    { label: "Sell Art", path: "/upload" },
    { label: "Sign Out", path: "/auth/login" },
    { label: "Profile", path: "/profile" }, 
  ] as const;

  const onNavigate = (path: (typeof menuItems)[number]["path"]) => {
    setMenuOpen(false);
    router.push(path as any); // cast to satisfy types, per Expo Router guidance :contentReference[oaicite:2]{index=2}
  };

  return (
    <View className="w-full bg-white border-b border-gray-200 dark:bg-black dark:border-neutral-800">
      {/* Top navigation */}
      <View className="flex-row items-center justify-between px-4 py-3">
        {/* Menu + Logo */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.push("/" as any)}
          >
            <Palette size={24} color="#4F46E5" />
            <Text className="ml-2 text-xl font-bold text-black dark:text-white">UAL</Text>
          </TouchableOpacity>
        </View>

        {/* Icon buttons */}
        <View className="flex-row space-x-3">
          <TouchableOpacity>
            <Search size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <Heart size={22} color="#000" />
            <Badge className="absolute -top-1 -right-1 text-xs">3</Badge>
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <ShoppingCart size={22} color="#000" />
            <Badge className="absolute -top-1 -right-1 text-xs">2</Badge>
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile" as any)}>
            <User size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown menu */}
      {menuOpen && (
        <ScrollView className="px-4 pb-3">
          {menuItems.map(({ label, path }) => (
            <TouchableOpacity
              key={path}
              onPress={() => onNavigate(path)}
              className="py-2"
            >
              <Text className="text-lg text-black dark:text-white">{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

