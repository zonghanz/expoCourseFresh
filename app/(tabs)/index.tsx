import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text>Breuhh</Text>
      <Link href="/login" style={styles.navButton}>Login Page</Link>
      <Link href="/auth" style={styles.navButton}>Auth Page</Link>
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