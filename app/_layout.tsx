import { Stack } from "expo-router";
import { Text } from "react-native";
export default function RootLayout() {
  return (
    <>
      <Text>Hello</Text>
      <Stack>
        <Stack.Screen name="index" options={{title: "Home"}}/>
        <Stack.Screen name="login" options={{title: "Login"}}/>
      </Stack>
    </>
    );
}
