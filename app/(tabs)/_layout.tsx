import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function RootLayout() {
  return (
      <Tabs screenOptions={{ headerStyle: {backgroundColor: "#f5f5f5"},
      headerShadowVisible: false,
      tabBarStyle: {
        backgroundColor: "#f5f5f5", 
        borderWidth: 0, 
        elevation: 0, 
        shadowOpacity: 0,
      },
      tabBarActiveTintColor: "#6200ee", 
      tabBarInactiveTintColor: "#666666"
    }}>
      <Tabs.Screen name="index" options={{title: "Today's Habits", headerTitleAlign: "center", 
      tabBarIcon: ({color, size,focused}) => (
        <MaterialCommunityIcons name="calendar-today" size ={size} color={color}/>
        ), 
      }}/>

      <Tabs.Screen name="streaks" options={{title: "Streaks", headerTitleAlign: "center", 
      tabBarIcon: ({color, size}) => (
        <MaterialCommunityIcons name="chart-line" size ={size} color={color}/>
        ), 
      }}/>

      <Tabs.Screen name="add-habits" options={{title: "Add Habits", headerTitleAlign: "center", 
      tabBarIcon: ({color, size}) => (
        <MaterialCommunityIcons name="plus-circle" size ={size} color={color}/>
        ), 
      }}/>
    
    </Tabs>
    );
}
