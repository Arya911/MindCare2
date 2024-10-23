import { Stack } from "expo-router";

const LayoutTabs = () => {
  return (
    <Stack>
      {/* No need to explicitly define the component for each screen */}
      <Stack.Screen name="home" options={{ headerShown: true }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="survey" options={{ headerShown: false }} />
    </Stack>
  );
};

export default LayoutTabs;
