import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  containerStyles?: StyleProp<ViewStyle>;
};

const Input = ({ label, style, containerStyles, ...props }: Props) => {
  return (
    <View style={containerStyles}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder="Type here"
        autoComplete="off"
        autoCapitalize="none"
        style={[styles.input, style]}
        cursorColor={"#212529"}
        placeholderTextColor={"#adb5bd"}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Outfit-Regular",
    fontSize: 14,
  },
  input: {
    height: 44,
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "#212529",
    fontFamily: "Outfit-Regular",
    fontSize: 14,
  },
});
