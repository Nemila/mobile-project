import Button from "@/components/buttons/button";
import Input from "@/components/input";
import StyledText from "@/components/typography";
import { FIREBASE_AUTH } from "@/firebase";
import { useStore } from "@/state/store";
import { getCurrentUserDocument, updateUserProfile } from "@/utils/db/users";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { ZodError } from "zod";

const Screen = () => {
  const { setUser } = useStore();
  const [userDoc, setUserDoc] = useState<UserDocument | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUserDocument();
      setUserDoc(data);
    };
    fetchData();
  });

  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");

  const handleSubmit = async () => {
    try {
      await updateUserProfile({
        department,
        picturePath: `https://api.dicebear.com/9.x/notionists-neutral/png?seed=${fullName}`,
        fullName,
        studentId,
        schoolYear,
      });
      Alert.alert("Success", "User profile updated with success");
    } catch (error) {
      if (error instanceof ZodError) {
        Alert.alert("Error", error.errors[0].message);
        return;
      }
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
        return;
      }
      Alert.alert("Error", "Unknown error");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setUser(null);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            padding: 16,
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: `https://api.dicebear.com/9.x/notionists-neutral/png?seed=${fullName}`,
            }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
            }}
          />

          <View style={{ gap: 8, width: "100%" }}>
            <Input
              label="Fullname"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
            <Input
              label="Department"
              value={department}
              onChangeText={(text) => setDepartment(text)}
            />
            <Input
              label="Student ID"
              value={studentId}
              onChangeText={(text) => setStudentId(text)}
            />
            <Input
              label="Year"
              value={schoolYear}
              onChangeText={(text) => setSchoolYear(text)}
            />

            <Button onPress={handleSubmit} style={{ width: "100%" }}>
              Update
            </Button>

            <Button onPress={handleSignOut}>Log out</Button>

            {/* <StyledText type="md">{JSON.stringify(userDoc)}</StyledText> */}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Screen;
