import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { z } from "zod";

export const getUsersByEmail = async (emails: string[]) => {
  const retrievedUsers: UserDocument[] = [];
  const collectionRef = collection(FIREBASE_FIRESTORE, "users");
  const getUserQuery = query(collectionRef, where("email", "in", emails));
  const retrievedUsersDoc = await getDocs(getUserQuery);

  retrievedUsersDoc.forEach((doc) => {
    const value = doc.data() as UserDocument;
    retrievedUsers.push({ ...value, id: doc.id });
  });

  return retrievedUsers;
};

export const registerUser = async (email: string, password: string) => {
  const user = await createUserWithEmailAndPassword(
    FIREBASE_AUTH,
    email,
    password
  );
  const docRef = collection(FIREBASE_FIRESTORE, "users");
  const addedUser = await addDoc(docRef, {
    email: user.user.email,
    userId: user.user.uid,
  });
  return addedUser;
};

export const getCurrentUserDocument = async () => {
  const user = FIREBASE_AUTH.currentUser;
  if (!user) throw new Error("Not Authorized");
  const usersRef = collection(FIREBASE_FIRESTORE, "users");
  const userDocs = await getDocs(
    query(usersRef, where("userId", "==", user.uid))
  );
  let foundUser: UserDocument[] = [];

  userDocs.forEach((doc) => {
    const value = doc.data() as UserDocument;
    foundUser.push({
      ...value,
      id: doc.id,
    });
  });

  return foundUser[0];
};

const updateUserProfileSchema = z.object({
  fullName: z.string().min(2),
  department: z.string().min(2),
  picturePath: z.string().url(),
  studentId: z.string().min(2),
  schoolYear: z.string().min(4),
});

export const updateUserProfile = async (
  data: z.infer<typeof updateUserProfileSchema>
) => {
  const userDoc = await getCurrentUserDocument();
  const validatedData = await updateUserProfileSchema.parseAsync(data);
  const userRef = doc(FIREBASE_FIRESTORE, "users", userDoc.id);
  await updateDoc(userRef, { ...validatedData, email: userDoc.email });
  console.log("User updated with success");
};

export const getAllUsers = async () => {
  const usersRef = collection(FIREBASE_FIRESTORE, "users");
  const userDocs = await getDocs(usersRef);
  const userList: UserDocument[] = [];

  userDocs.forEach((doc) => {
    const value = doc.data() as UserDocument;
    userList.push({ ...value, id: doc.id });
  });

  return userList;
};
