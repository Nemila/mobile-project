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

const Button = ({ children, style, isLoading, ...props }: Props) => {
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

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: 125,
    height: 46,
  },
  label: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.light,
    textAlign: "center",
  },
});
