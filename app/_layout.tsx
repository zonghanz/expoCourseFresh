import { AuthProvider } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import React from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;
  const router = useRouter(); //use this whenever you want to redirect to different parts of the app



  return <>{children}</>
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </RouteGuard>
    </AuthProvider>
  );
}
