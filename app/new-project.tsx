import Button from "@/components/buttons/button";
import Input from "@/components/input";
import MultiInput from "@/components/multi-input";
import Textarea from "@/components/textarea";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/firebase";
import { getUsersByEmail } from "@/utils/db/users";
import { Stack } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import * as z from "zod";

const schema = z.object({
  title: z.string().trim(),
  field: z.string().trim(),
  description: z.string().trim(),
  members: z.array(z.string().email()),
});

const NewProjectScreen = () => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const valideData = await schema.parseAsync({
        title,
        field,
        description,
        members,
      });

      const currentUser = FIREBASE_AUTH.currentUser;
      if (!currentUser || !currentUser.email) throw new Error("Not Authorized");
      const filteredUsers = Array.from(
        new Set(members.filter((item) => item !== currentUser?.email))
      );
      filteredUsers.push(currentUser.email);
      const users = await getUsersByEmail(filteredUsers);

      await addDoc(collection(FIREBASE_FIRESTORE, "projects"), {
        title: valideData.title,
        field: valideData.field,
        description: valideData.description,
        members: users.map((item) => item.email),
      });

      alert("Project Created");
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(error.errors[0].message);
        return;
      }

      if (error instanceof Error) {
        alert(error.message);
        return;
      }

      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "New Project",
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1, padding: 16, gap: 8 }}>
        <Input
          label="Title"
          value={title}
          onChangeText={(value) => setTitle(value)}
        />

        <Input
          label="Field"
          value={field}
          onChangeText={(value) => setField(value)}
        />

        <Textarea
          label="Description"
          value={description}
          onChangeText={(value) => setDescription(value)}
        />

        <MultiInput onChange={setMembers} buttonLabel="Add Member" />

        <Button isLoading={isLoading} onPress={handleSubmit}>
          Submit
        </Button>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewProjectScreen;

const styles = StyleSheet.create({});
