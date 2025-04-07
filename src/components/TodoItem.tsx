// src/components/TodoItem.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AnimatedCheckbox from "./AnimatedCheckbox";

interface TodoItemProps {
  todo: { id: number; todo: string; completed: boolean };
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    _dragX: Animated.AnimatedInterpolation,
  ) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        style={[styles.itemContainer, todo.completed && styles.completedItem]}
      >
        <AnimatedCheckbox
          checked={todo.completed}
          onToggle={() => onToggle(todo.id)}
        />
        <Text style={[styles.itemText, todo.completed && styles.strikethrough]}>
          {todo.todo}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  completedItem: {
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
    flexShrink: 1,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 16,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TodoItem;
