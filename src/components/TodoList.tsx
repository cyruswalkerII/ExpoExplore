// src/components/TodoList.tsx
import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchTodos,
  loadTodosFromStorage,
  toggleTodo,
  deleteTodo,
} from "../redux/todosSlice";
import TodoItem from "./TodoItem";
import { useNetworkSync } from "../hooks/useNetworkSync";

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos,
  );

  // 🧠 Automatically sync on network restore
  useNetworkSync();

  useEffect(() => {
    dispatch(loadTodosFromStorage());
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id: number) => dispatch(deleteTodo(id));
  const handleToggle = (id: number) => dispatch(toggleTodo(id));

  if (loading) return <ActivityIndicator style={styles.centered} />;
  if (error)
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem todo={item} onDelete={handleDelete} onToggle={handleToggle} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoList;
