import Input from "@/components/input";
import { getAllUsers } from "@/utils/db/users";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Screen = () => {
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
    <View style={{ flex: 1, gap: 16, padding: 16 }}>
      <Input
        value={query}
        onChangeText={(value) => setQuery(value)}
        placeholder="Search email"
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={users}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
          renderItem={({ item }) => (
            <View
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
                    "https://api.dicebear.com/9.x/shapes/png?seed=empty",
                }}
              />

              <View>
                <Text>{item.fullName || "No Name"}</Text>
                <Text style={{ fontSize: 12, marginTop: 4 }}>{item.email}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({});
