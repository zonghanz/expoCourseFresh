import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function AuthScreen(){
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} //if IOS else android
        >
            <View>
                <Text>Create Account</Text>
            </View>
        </KeyboardAvoidingView>
    );
}

//Stopped at 47:09