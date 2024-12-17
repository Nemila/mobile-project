import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

const ChatIdScreen = () => {
  const { chatId } = useLocalSearchParams();
  const arr = [1, 2];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1, padding: 8, paddingBottom: 70 }}>
        <ScrollView>
          <Text>ChatIdScreen {chatId}</Text>
        </ScrollView>

        <View style={{ gap: 8, flexDirection: "row" }}>
          <TextInput
            style={{
              height: 48,
              backgroundColor: "white",
              paddingHorizontal: 16,
              borderRadius: 8,
              flex: 1,
            }}
            placeholder="Message"
          />
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: 8,
            }}
          >
            <Entypo name="message" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatIdScreen;

const styles = StyleSheet.create({});
