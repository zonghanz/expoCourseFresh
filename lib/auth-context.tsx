import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite"; //import user type from appwrite
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null; //Appwrite's built in type Models.Preferences, { [key: string]: any }
    isLoadingUser: boolean;
    signUp: (email: string, password: string) => Promise<string | null>; //Promise is a placeholder for the result of an asynchronous operation. Represents future value u can get. String means got error. Null means no error in this case.
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined); //Typescript syntax, where value inside is either AuthContextType or undefined. And (undefined) just means default value is undefined

export function AuthProvider({children}: {children: React.ReactNode}){
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null
    );

    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () =>  {
        try {
            const session = await account.get();
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoadingUser(false);
        }
    }

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
            const session = await account.get();
            setUser(session);
            return null;
        } catch (error){
            if (error instanceof Error){
                return error.message;
            }

            return "An error occurred during sign in";
        }
    };

    const signOut = async () => {
        try{
            await account.deleteSession("current");
            setUser(null);
        } catch(error) {
            console.log(error);
        }
        
    }
    
    return (
        <AuthContext.Provider value={{ user, signUp, signIn, isLoadingUser, signOut}}> 
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
