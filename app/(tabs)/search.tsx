import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "@/components/input";

type Props = {};

const Screen = (props: Props) => {
  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Input placeholder="Search something..." />
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({});
