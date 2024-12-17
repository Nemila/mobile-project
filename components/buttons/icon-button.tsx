import theme from "@/data/constants";
import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
  icon: typeof AntDesign.defaultProps;
  iconColor?: string;
};

const IconButton = ({
  children,
  style,
  iconColor,
  icon,
  isLoading,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <AntDesign
          size={20}
          name={icon}
          color={iconColor ? iconColor : theme.colors.light}
        />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: theme.colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
});
