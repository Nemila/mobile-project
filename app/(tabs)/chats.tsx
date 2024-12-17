import Input from "@/components/input";
import { getAllUsers } from "@/utils/db/users";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Screen = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          return;
        }

        console.log("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 16, gap: 16 }}>
      <Input placeholder="Search user" />

      <FlatList
        data={users}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chats/[chatId]",
                params: {
                  chatId: String(item),
                },
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              style={{ borderRadius: 16, width: 56, height: 56 }}
              source={{
                uri:
                  item.picturePath ||
                  "https://api.dicebear.com/9.x/notionists-neutral/png?seed=nemila",
              }}
            />

            <View>
              <Text>{item.email}</Text>
              <Text style={{ fontSize: 12, marginTop: 4 }}>
                Are ou coming tomorrow?
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({});
