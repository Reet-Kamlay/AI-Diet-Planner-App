import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Constants from "expo-constants";
import { UserContext} from "../context/UserContext"
import { useState } from "react";
export default function RootLayout() {
  const convexUrl = Constants.expoConfig?.extra?.convexUrl ?? "";
  const convex = new ConvexReactClient(convexUrl, {
    unsavedChangesWarning: false,
  });const [user,setUser]=useState();

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{user,setUser}}>
      <Stack screenOptions={{ headerShown: false }}>

        <Stack.Screen name="index" />
      </Stack>
      </UserContext.Provider>
    </ConvexProvider>
  );
}
