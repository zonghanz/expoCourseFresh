import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const {signOut} = useAuth();
  return (
    <View style={styles.view}>
      <Text>Breuhh</Text>
      <Link href="/login" style={styles.navButton}>Login Page</Link>
      <Link href="/auth" style={styles.navButton}>Auth Page</Link>
      <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
  navButton: {
    width:100, height:20, backgroundColor:"coral", borderRadius: 8, textAlign:"center", marginTop:10
  }
})