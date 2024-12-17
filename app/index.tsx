import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/outline-button";
import Input from "@/components/input";
import StyledText from "@/components/typography";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/firebase";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        return Alert.alert("Auth Error", error.message);
      }
      if (error instanceof Error) {
        return Alert.alert("Client Error", error.message);
      }
      return Alert.alert("Unknown Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const newUser = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const docRef = collection(FIREBASE_FIRESTORE, "users");
      await addDoc(docRef, {
        email: newUser.user.email,
        userId: newUser.user.uid,
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        return Alert.alert(error.name, error.message);
      }
      if (error instanceof Error) {
        return Alert.alert("Client Error", error.message);
      }
      return Alert.alert("Unknown Error", "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <Stack.Screen options={{ title: "Login" }} />

      <SafeAreaView
        style={{
          flex: 1,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", width: "100%" }}
        >
          <StyledText type="xxl">Welcome SCAP Member</StyledText>

          <View style={{ gap: 8, marginBottom: 16 }}>
            <Input
              label="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <View style={{ gap: 8, flexDirection: "row" }}>
            <Button
              isLoading={isLoading}
              onPress={handleSignIn}
              style={{ flex: 1 }}
            >
              Log In
            </Button>

            <OutlineButton
              isLoading={isLoading}
              onPress={handleSignUp}
              style={{ flex: 1 }}
            >
              Register
            </OutlineButton>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
