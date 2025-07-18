"use client";

import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { Modal, Portal } from "react-native-paper";

import { JobCard } from "@/components/JobCard";
import { PostJobForm } from "@/components/PostJobForm";
import { Button } from "@/components/ui/button";

export default function JobsPage() {
  const [tab, setTab] = useState("browse");
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  return (
    <Tabs.Container
      renderHeader={() => (
        <View className="px-4 pt-6 pb-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-black">Job Board</Text>
          <Text className="text-gray-600 text-sm">
            Find & share jobs within the UAL community
          </Text>
        </View>
      )}
    >
      {/* Browse Jobs Tab */}
      <Tabs.Tab name="browse" label="Browse Jobs">
        <Tabs.ScrollView className="px-4 py-2">
          <TextInput
            className="bg-gray-100 p-3 rounded-md mb-4"
            placeholder="Search jobs..."
            value={search}
            onChangeText={setSearch}
          />

          {/* Placeholder JobCards (replace with map) */}
          <JobCard />
          <JobCard />

          {/* Optional: Empty state example */}
          {/* <View className="items-center mt-16">
            <Text className="text-gray-600 mt-4">No jobs found</Text>
          </View> */}
        </Tabs.ScrollView>
      </Tabs.Tab>

      {/* My Posts Tab */}
      <Tabs.Tab name="my-posts" label="My Posts">
        <Tabs.ScrollView className="px-4 py-6">
          <Text className="text-gray-600 text-center">No job posts yet.</Text>
          <Button className="mt-4 flex-row items-center justify-center" onPress={() => setModalVisible(true)}>
            <Plus size={16} className="mr-2" />
            Post a Job
          </Button>
        </Tabs.ScrollView>
      </Tabs.Tab>

      {/* Applications Tab */}
      <Tabs.Tab name="applications" label="Applications">
        <Tabs.ScrollView className="px-4 py-6">
          <Text className="text-gray-600 text-center">No applications yet.</Text>
        </Tabs.ScrollView>
      </Tabs.Tab>

      {/* Modal for Posting a Job */}
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <PostJobForm onClose={() => setModalVisible(false)} />
        </Modal>
      </Portal>
    </Tabs.Container>
  );
}
