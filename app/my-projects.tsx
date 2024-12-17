import StyledText from "@/components/typography";
import theme from "@/data/constants";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/firebase";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type Project = {
  id: number;
  title: string;
  description: string;
  imagePath: (id: string) => any;
};

const PROJECT_IMAGES: Project[] = [
  {
    id: 1,
    title: "Project One",
    description:
      "Description for project one - this is a sample project description",
    imagePath: require("../assets/images/project/img0.jpg"),
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "Description for project two - another sample project description",
    imagePath: require("../assets/images/project/img1.jpg"),
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "Description for project three - yet another sample description",
    imagePath: require("../assets/images/project/img2.jpg"),
  },
  {
    id: 4,
    title: "Project Four",
    description: "Description for project four - a fourth sample description",
    imagePath: require("../assets/images/project/img3.jpg"),
  },
  {
    id: 5,
    title: "Project Five",
    description:
      "Description for project five - fifth project description here",
    imagePath: require("../assets/images/project/img4.jpg"),
  },
  {
    id: 6,
    title: "Project Six",
    description:
      "Description for project six - sixth sample project description",
    imagePath: require("../assets/images/project/img5.jpg"),
  },
  {
    id: 7,
    title: "Project Seven",
    description: "Description for project seven - seventh project details",
    imagePath: require("../assets/images/project/img6.jpg"),
  },
  {
    id: 8,
    title: "Project Eight",
    description: "Description for project eight - eighth project information",
    imagePath: require("../assets/images/project/img7.jpg"),
  },
  {
    id: 9,
    title: "Project Nine",
    description: "Description for project nine - ninth project description",
    imagePath: require("../assets/images/project/img8.jpg"),
  },
  {
    id: 10,
    title: "Project Ten",
    description: "Description for project ten - final project description",
    imagePath: require("../assets/images/project/img9.jpg"),
  },
];

const MyProjectsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<DocumentData[]>([]);
  const router = useRouter();

  const arr = Array.from({ length: 10 }, (_, index) => `img${index}.jpg`);

  useEffect(() => {
    const fetchMyProject = async () => {
      try {
        const data = await getDocs(
          query(
            collection(FIREBASE_FIRESTORE, "projects"),
            where("members", "array-contains", FIREBASE_AUTH.currentUser?.email)
          )
        );

        data.forEach((doc) => {
          const value = doc.data();
          setProjects((prev) => [...prev, value]);
        });
      } catch (error) {
        console.error(error, "sdas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProject();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Old Projects",
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            gap: 16,
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            padding: 16,
          }}
        >
          {PROJECT_IMAGES.map((item, index) => (
            <CardComponent key={item.id} number={index + 1} project={item} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const CardComponent = ({
  project,
  number,
}: {
  number: number;
  project: Project;
}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={project.imagePath} />

      <View
        style={{
          position: "absolute",
          backgroundColor: theme.colors.primary,
          width: 46,
          height: 46,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          elevation: 6,
          top: 4,
          left: 4,
        }}
      >
        <StyledText
          type="md"
          style={{
            color: theme.colors.light,
          }}
        >
          {number}
        </StyledText>
      </View>

      <View>
        <StyledText
          type="sm"
          style={{
            fontFamily: theme.fontFamily.semibold,
          }}
          numberOfLines={1}
        >
          {project.title}
        </StyledText>
        <StyledText type="xs" numberOfLines={2}>
          {project.description}
        </StyledText>
      </View>
    </View>
  );
};

export default MyProjectsScreen;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 100,
    width: "50%",
    maxWidth: "50%",
    gap: 8,
    position: "relative",
  },
  cardImage: {
    aspectRatio: 9 / 16,
    borderRadius: 16,
  },
});
