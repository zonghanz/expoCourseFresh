import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Text, Button, SegmentedButtons, TextInput, useTheme } from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"]; //*shd put "as const" at the back
type Frequency = (typeof FREQUENCIES)[number]; 
//*if have "as const", essentially this: type Frequency = "daily" | "weekly" | "monthly"; 
// + type decalres a new type alias 
// + typeof gets the type of a value or variable at compile time

export default function AddHabitScreen(){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<string>("");
    const [error, setError] = useState<string>("");
    const {user} = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const handleSubmit = async () => {
        if (!user) return;

        try{
            await databases.createDocument(
                DATABASE_ID, 
                HABITS_COLLECTION_ID, 
                ID.unique(), 
                {
                    user_id: user.$id,
                    title,
                    description,
                    streak_count: 0,
                    last_completed: new Date().toISOString(),
                    frequency,
                }
            ); //createDocument adds a document to a collection

            router.back();
        } catch (error) {
            if (error instanceof Error){ //this just checks if the error is really a Javascript Error.
                setError(error.message);
                return;
            }

            setError("There was an error while creating the habit.")
        }

    }

    return (
    <View style={styles.container}>
        <TextInput label="Title" mode="outlined" style={styles.input} onChangeText={setTitle}/>
        <TextInput label="Description" mode="outlined" onChangeText={setDescription}/>
        <View style={styles.frequencyContainer}>
            <SegmentedButtons
                value={frequency} //initialise first
                onValueChange={(value) => setFrequency(value as Frequency)} // (value) is just retrieving current selected + value as Frequency means to only get data that has their type (Frequency)
                buttons ={FREQUENCIES.map((freq) => ({
                    value: freq,
                    label: freq.charAt(0).toUpperCase() + freq.slice(1),
            }))}/>
        </View>
        <Button mode="contained" onPress={handleSubmit} disabled={!title||!description}>Add Habit</Button>
        {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "$f5f5f5",
        justifyContent: "center"
    },

    input:{
        marginBottom:16,
    },

    frequencyContainer: {
        marginTop: 16,
        marginBottom: 24,
    },
})