import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Home } from "./src/components/Home";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Home />
    </GestureHandlerRootView>
  );
}
