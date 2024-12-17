import theme from "@/data/constants";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
};

const OutlineButton = ({ children, style, isLoading, ...props }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.label}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = StyleSheet.create({
  button: {
    borderColor: theme.colors.dark,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    width: 125,
    height: 46,
  },
  label: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.dark,
    textAlign: "center",
  },
});
