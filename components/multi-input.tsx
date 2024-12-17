import theme from "@/data/constants";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Button from "./buttons/button";
import IconButton from "./buttons/icon-button";
import Input from "./input";

type ElementType = {
  id: number;
  value: string;
};

type Props = {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  buttonLabel?: string;
};

const MultiInput = ({ onChange, buttonLabel = "Add Element" }: Props) => {
  const [elements, setElements] = useState<ElementType[]>([]);

  const addElement = () => {
    setElements((prev) => [...prev, { id: prev.length + 1, value: "" }]);
  };
  const removeElement = (elementId: number) => {
    const newElements = elements.filter((item) => item.id !== elementId);
    setElements(newElements);
  };
  const setElementValue = (elementId: number, value: string) => {
    const newValues = elements.map((item) => ({
      id: item.id,
      value: item.id === elementId ? value : item.value,
    }));
    setElements(newValues);
  };

  useEffect(() => {
    const values = elements.map((item) => item.value);
    onChange(values);
  }, [elements]);

  return (
    <View style={styles.container}>
      {elements.length > 0 && (
        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={elements}
          renderItem={({ item }) => (
            <MultiElement
              element={item}
              removeElement={removeElement}
              setElementValue={setElementValue}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        />
      )}
      <Button onPress={addElement} style={{ width: "100%" }}>
        {buttonLabel}
      </Button>
    </View>
  );
};

type MultiElementType = {
  element: ElementType;
  removeElement: (elementId: number) => void;
  setElementValue: (elementId: number, value: string) => void;
};

const MultiElement = ({
  element,
  removeElement,
  setElementValue,
}: MultiElementType) => {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Input
        value={element.value}
        containerStyles={{ flex: 1 }}
        onChangeText={(text) => setElementValue(element.id, text)}
      />
      <IconButton icon={"close"} onPress={() => removeElement(element.id)} />
    </View>
  );
};

export default MultiInput;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
    borderRadius: 8,
    maxHeight: 200,
    elevation: 1,
    backgroundColor: theme.colors.light,
  },
});
