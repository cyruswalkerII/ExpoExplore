import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AnimatedCheckbox from "./AnimatedCheckbox";
import { Todo } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  const renderRightActions = () => (
    <View style={styles.deleteAction}>
      <Ionicons name="trash" size={24} color="#fff" />
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => onDelete(todo.id)}
    >
      <View style={styles.card}>
        <AnimatedCheckbox
          checked={todo.completed}
          onToggle={() => onToggle(todo.id)}
        />
        <Text style={[styles.text, todo.completed && styles.completed]}>
          {todo.todo}
        </Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteAction: {
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 12,
    marginVertical: 6,
  },
});

export default TodoItem;
