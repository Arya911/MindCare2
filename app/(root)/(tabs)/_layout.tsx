import { Stack } from "expo-router";
import {UserProvider} from "@/app/UserContext";

const LayoutTabs = () => {
  return (
      // <UserProvider>
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="survey" options={{ headerShown: false }} />
    </Stack>
      // </UserProvider>
  );
};

export default LayoutTabs;