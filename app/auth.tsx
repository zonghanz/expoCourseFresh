import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen(){
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const handleAuth = async () => { //async to call the appwrite API to sign in/up
        if(!email || !password){
            setError("Please fill in all fields");
        }
    };

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium"> {isSignUp ? "Create Account" : "Welcome Back"}</Text>
                <TextInput 
                 label="Email" 
                 autoCapitalize="none" 
                 keyboardType="email-address" 
                 placeholder="example@gmail.com" 
                 mode="outlined" 
                 style={styles.input}
                 onChangeText={setEmail}
                />

                <TextInput 
                 label="Password"
                 autoCapitalize="none" 
                 keyboardType="email-address" 
                 mode="outlined" 
                 style={styles.input}
                 onChangeText={setPassword}
                />

                {error && <Text>{error}</Text>}

                <Button mode="contained" onPress={handleAuth} style={styles.button}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>{isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        textAlign: "center",
        marginTop: 8,
    },
    switchModeButton: {
        marginTop: 16,
    },
})
