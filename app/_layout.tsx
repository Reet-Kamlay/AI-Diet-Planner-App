import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";
import { UserContext } from "../context/UserContext";
import {RefreshDataContext} from './../context/RefreshDataContext'
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  const convexUrl = Constants.expoConfig?.extra?.convexUrl ?? "";
  const convex = new ConvexReactClient(convexUrl, {
    unsavedChangesWarning: false,
  });
  const [user, setUser] = useState();
  const [refreshData,setRefreshData]=useState();

  return (
    <GestureHandlerRootView style={styles.container}>
      <ConvexProvider client={convex}>
        <UserContext.Provider value={{ user, setUser }}>
          <RefreshDataContext.Provider value={{refreshData,setRefreshData}}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          </RefreshDataContext.Provider>
        </UserContext.Provider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
