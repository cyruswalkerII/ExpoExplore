// src/components/AnimatedCheckbox.tsx
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Easing,
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

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [checked]);

  const boxAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: checked ? "#4caf50" : "#e0e0e0",
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [1, 1.1]),
      },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        scale: interpolate(progress.value, [0, 1], [0.5, 1]),
      },
    ],
  }));

  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[styles.checkbox, boxAnimatedStyle]}>
        <Animated.View style={iconAnimatedStyle}>
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
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});

export default AnimatedCheckbox;
