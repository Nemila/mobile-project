import StyledText from "@/components/typography";
import theme from "@/data/constants";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "@/firebase";
import { useQuotes } from "@/hooks/use-quotes";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import PagerView from "react-native-pager-view";

const Screen = () => {
  const { quotes, isLoading } = useQuotes();
  const [projects, setProjects] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) return [];

      const projectRef = collection(FIREBASE_FIRESTORE, "projects");
      const projectQuery = query(
        projectRef,
        where("members", "array-contains", user.email)
      );

      const unsubscribe = onSnapshot(projectQuery, (querySnapshot) => {
        const values: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          values.push(doc.data());
        });
        setProjects(values);
      });

      return () => unsubscribe();
    };
    fetchProject();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        {/* {isLoading ? (
          <ActivityIndicator />
        ) : ( */}
        <PagerView style={{ height: 200 }} initialPage={0}>
          {quotes.slice(0, 10).map((item, index) => (
            <View style={styles.inspiration} key={index}>
              <View style={{ gap: 8 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "Outfit-Medium",
                    color: theme.colors.light,
                    fontSize: 16,
                  }}
                >
                  {item.q}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    fontFamily: "Outfit-Regular",
                    color: theme.colors.light,
                    fontSize: 14,
                  }}
                >
                  ~{item.a}
                </Text>
              </View>
            </View>
          ))}
        </PagerView>
        {/* )} */}

        <MapView
          initialRegion={{
            latitude: 35.2218006,
            longitude: 33.4153426,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 16,
          }}
        >
          <Marker
            coordinate={{
              latitude: 35.2218006,
              longitude: 33.4153426,
            }}
            title="Workshop"
            description="Workshop location"
          />
        </MapView>

        <View style={{ flex: 1, gap: 8 }}>
          <StyledText type="lg">Ongoing Projects</StyledText>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ gap: 16 }}>
              {projects.map((project, index) => (
                <View
                  key={`${project.name}-${index}`}
                  style={{
                    borderRadius: 16,
                    backgroundColor: theme.colors.primary,

                    width: "100%",
                    height: 150,
                    padding: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <AntDesign name="user" size={16} />
                      <StyledText
                        type="sm"
                        style={{
                          color: theme.colors.light,
                        }}
                      >
                        {project.members.length} Members
                      </StyledText>
                    </View>

                    <View>
                      <StyledText
                        type="sm"
                        style={{
                          color: theme.colors.light,
                        }}
                      >
                        Group 14
                      </StyledText>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: "auto",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View></View>
                    <View
                      style={{
                        alignItems: "flex-end",
                      }}
                    >
                      <StyledText type="sm">{project.field}</StyledText>
                      <StyledText type="md">{project.title}</StyledText>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  inspiration: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
});
