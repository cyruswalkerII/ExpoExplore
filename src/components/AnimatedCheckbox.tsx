import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface AnimatedCheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onToggle,
}) => {
  const progress = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(checked ? 1 : 0);
  }, [checked]);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: checked ? "#4caf50" : "#e0e0e0",
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.1]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.5, 1]) }],
  }));

  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[styles.checkbox, boxStyle]}>
        <Animated.View style={iconStyle}>
          <Ionicons name="checkmark" size={20} color="#fff" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});

export default AnimatedCheckbox;
