import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
};

const Textarea = ({ label, ...props }: Props) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        multiline
        autoComplete="off"
        style={styles.input}
        autoCapitalize="none"
        placeholder="Type here"
        cursorColor={"#212529"}
        placeholderTextColor={"#adb5bd"}
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
};

export default Textarea;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Outfit-Regular",
    fontSize: 14,
  },
  input: {
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "#212529",
    fontFamily: "Outfit-Regular",
    fontSize: 14,
  },
});
