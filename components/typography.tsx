import theme from "@/data/constants";
import { StyleSheet, Text, TextProps } from "react-native";

type Props = TextProps & {
  type: "xxl" | "xl" | "lg" | "md" | "body" | "sm" | "xs";
};

const StyledText = ({ type, children, style, ...props }: Props) => {
  return (
    <Text style={[styles[type], style]} {...props}>
      {children}
    </Text>
  );
};

export default StyledText;

const styles = StyleSheet.create({
  xxl: {
    fontSize: 32,
    fontFamily: theme.fontFamily.semibold,
  },
  xl: {
    fontSize: 28,
    fontFamily: theme.fontFamily.semibold,
  },
  lg: {
    fontSize: 24,
    fontFamily: theme.fontFamily.medium,
  },
  md: {
    fontSize: 20,
    fontFamily: theme.fontFamily.regular,
  },
  body: {
    fontSize: 17,
    fontFamily: theme.fontFamily.regular,
  },
  sm: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
  },
  xs: {
    fontSize: 12,
    fontFamily: theme.fontFamily.regular,
  },
});
