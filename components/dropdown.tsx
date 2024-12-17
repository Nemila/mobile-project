import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

const Dropdown = ({ children, trigger }: Props) => {
  const dropdownWidth = 200;
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (triggerRef.current && isOpen) {
      triggerRef.current.measure((x, y, width, height, px, py) => {
        setPosition({
          x: px - dropdownWidth + width,
          y: py + width,
        });
      });
    }
  }, [isOpen, triggerRef]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsOpen(true)}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>

      {isOpen && (
        <Modal
          visible={isOpen}
          transparent={true}
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}>
              <View
                style={{
                  backgroundColor: "white",
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
