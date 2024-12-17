import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationScreen = () => {
  const arr = Array.from({ length: 10 });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {arr.map((item) => (
          <TouchableOpacity
            style={{
              padding: 16,
              backgroundColor: "white",
              borderBottomColor: "#DBD3D3",
              borderBottomWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>Content Change in CVLE101/CONT101</Text>
              <Text>Engineering Drawing</Text>

              <View
                style={{
                  gap: 4,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 12 }}>12 hours ago</Text>
                <Text>&bull;</Text>
                <Text style={{ fontSize: 12 }}>Dr. Keyvan</Text>
              </View>
            </View>

            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#D76C82",
                borderRadius: 16,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
