import IconButton from "@/components/buttons/icon-button";
import theme from "@/data/constants";
import { AntDesign } from "@expo/vector-icons";
import { Link, Stack, Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const TabsLayout = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.light,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 120,
          },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8, marginRight: 8 }}>
              <Link href={"/my-projects"} asChild>
                <IconButton
                  icon={"picture"}
                  iconColor={theme.colors.dark}
                  style={{
                    backgroundColor: theme.colors.light,
                  }}
                />
              </Link>

              <Link href={"/new-project"} asChild>
                <IconButton
                  icon={"plus"}
                  iconColor={theme.colors.dark}
                  style={{
                    backgroundColor: theme.colors.light,
                  }}
                />
              </Link>

              <Link href={"/notifications"} asChild>
                <IconButton
                  icon={"bells"}
                  iconColor={theme.colors.dark}
                  style={{
                    backgroundColor: theme.colors.light,
                  }}
                />
              </Link>
            </View>
          ),
          headerLeftContainerStyle: { height: "auto" },
        }}
      >
        <Tabs.Screen
          name="contact"
          options={{
            title: "Contact",
            tabBarIcon: (props) => (
              <AntDesign name="phone" size={24} color={props.color} />
            ),
          }}
        />

        <Tabs.Screen
          name="chats"
          options={{
            title: "Chats",
            tabBarIcon: (props) => (
              <AntDesign name="wechat" size={24} color={props.color} />
            ),
          }}
        />

        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: (props) => (
              <AntDesign name="home" size={24} color={props.color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: (props) => (
              <AntDesign name="search1" size={24} color={props.color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: (props) => (
              <AntDesign name="user" size={24} color={props.color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 8,
    marginRight: 8,
  },
});
