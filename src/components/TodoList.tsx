import React, { useEffect } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchTodos,
  loadTodosFromStorage,
  toggleTodo,
  deleteTodo,
} from "../redux/todosSlice";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(loadTodosFromStorage());
    dispatch(fetchTodos());
  }, [dispatch]);

  return loading ? (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          onToggle={(id) => dispatch(toggleTodo(id))}
          onDelete={(id) => dispatch(deleteTodo(id))}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoList;
