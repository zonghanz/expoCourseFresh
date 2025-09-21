import { DATABASE_ID, databases, HABITS_COLLECTION_ID, client, RealTimeResponse } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Surface, Text} from "react-native-paper";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

export default function Index() {
  const {signOut, user} = useAuth();

  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    if (user) {
      const channel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`;
      const habitsSubscription = client.subscribe(
        channel,
        (response: RealTimeResponse) => {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update"
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete"
            )
          ) {
            fetchHabits();
          }
          
        }
      );

      fetchHabits();  //this is only run once until the dependency of useEffect is changed and the effect is run again

      return () => { //to prevent memory leaks
        habitsSubscription();
      };
    }
  }, [user]);

  const fetchHabits = async () => {
    try{
      const response = await databases.listDocuments<Habit>( //!!added a <Habit> here!!
        DATABASE_ID, 
        HABITS_COLLECTION_ID, 
        [Query.equal("user_id", user?.$id ?? "")] //for passing in conditions. Its an array as you can pass multiple. if null ("") return empty str
      );
      console.log(response.documents);
      setHabits(response.documents as Habit[]); //Appwrite’s listDocuments doesn’t just return one document. It returns multiple documents, so TypeScript types it as an array.

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>Today&apos;s Habit</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>

      </View>

      {habits?.length === 0 ? (
        <View style={styles.emptyState}>
          {" "}
          <Text style={styles.emptyStateText}>
            No Habits yet. Add your first habit
          </Text>
        </View>
      ) : (
        habits?.map((habit, key) => (
        // eslint-disable-next-line react/jsx-key
        <Surface style={styles.card} elevation={1}>
          <View key={key} style={styles.cardContent}> 
            <Text style={styles.cardTitle}> {habit.title} </Text> 
            <Text style={styles.cardDescription}> {habit.description} </Text>
            <View style={styles.cardFooter}>
              <View style={styles.streakBadge}>
                <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"}/>
                <Text style={styles.streakText}>{habit.streak_count} day streak</Text>
              </View>
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text></View>
            </View>
          </View>
        </Surface>
        ))

      )}

      {/* <Text>Breuhh</Text>
      <Link href="/auth" style={styles.navButton}>Auth Page</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight:"bold",
  },
  card: {
    marginBottom:18,
    borderRadius:18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity:0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
    cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff98000",
    fontWeight: "bold", //PedroTech recommended to use Bold throughout app as it will help make app's appearance POP
    fontSize: 14,
  },
    frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold", 
    fontSize: 14,
    // textTransform: "uppercase" //Can do to this make whole text uppercase
  },
  emptyState:{
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  emptyStateText: {
    color:"#666666"
  }

   




})