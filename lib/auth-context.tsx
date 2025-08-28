import { createContext, useContext } from "react";
import { ID } from "react-native-appwrite"; //import user type from appwrite
import { account } from "./appwrite";

type AuthContextType = {
    // user: Models.User<Models.Preferences> | null; //Appwrite's built in type Models.Preferences, { [key: string]: any }
    signUp: (email: string, password: string) => Promise<string | null>; //Promise is a placeholder for the result of an asynchronous operation. Represents future value u can get. String means got error. Null means no error in this case.
    signIn: (email: string, password: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined); //Typescript syntax, where value inside is either AuthContextType or undefined. And (undefined) just means default value is undefined

export function AuthProvider({children}: {children: React.ReactNode}){
    const signUp = async (email: string, password: string) => {
        try{
            await account.create(ID.unique(), email, password) //ID is from appwrite. This fn creates a user from this project
            await signIn(email, password) // await signs you in immediately aft you signed up
            return null;
        } catch (error){
            if (error instanceof Error){
                return error.message;
            }

            return "An error occurred during sign up";
        }
    };

    const signIn = async (email: string, password: string) => {
        try{
            await account.createEmailPasswordSession(email, password) //EmailPasswordSession is from appwrite for sigining in
            return null;
        } catch (error){
            if (error instanceof Error){
                return error.message;
            }

            return "An error occurred during sign in";
        }
    };
    
    return (
        <AuthContext.Provider value={{ signUp, signIn }}> 
            {children}
        </AuthContext.Provider>
    );  
}

export function useAuth() {
    const context = useContext(AuthContext); //import useContext from "react"
    if (context === undefined){
        throw new Error("useAuth must be inside of the AuthProvider")
    }

    return context;
}
