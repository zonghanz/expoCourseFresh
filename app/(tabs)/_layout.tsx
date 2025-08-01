import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
      <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}>
        <Tabs.Screen name="index" options={{title: "Home", tabBarIcon: ({color,focused}) => 
          { return focused ? (<Feather name="home" size={24} color={color} />) 
          : (<Feather name="home" size={24} color="black" />);},}}/>
        <Tabs.Screen name="login" options={{title: "Login"}}/>
      </Tabs>
    );
}
