import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const ProjectIdScreen = () => {
  const { projectId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Project Gallery",
        }}
      />
      <View>
        <Text>Hello {projectId}</Text>
      </View>
    </>
  );
};

export default ProjectIdScreen;

const styles = StyleSheet.create({});
