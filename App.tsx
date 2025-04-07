// App.tsx
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { store, RootState } from "./store";
import {
  fetchTodos,
  loadTodosFromStorage,
  toggleTodo,
  deleteTodo,
  Todo,
} from "./src/redux/todosSlice";
import TodoItem from "./src/components/TodoItem";
import type { AppDispatch } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos,
  );

  useEffect(() => {
    // First load todos from AsyncStorage then fetch updated todos from the API
    dispatch(loadTodosFromStorage());
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    // Delete todo from Redux store
    dispatch(deleteTodo(id));
    // Optionally update AsyncStorage here after state change
  };

  const handleToggle = (id: number) => {
    // Toggle todo completed status in Redux store
    dispatch(toggleTodo(id));
    // Optionally update AsyncStorage here after state change
  };

  if (loading) {
    return <ActivityIndicator style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item: Todo) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem todo={item} onDelete={handleDelete} onToggle={handleToggle} />
      )}
    />
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>My Todo List</Text>
          <TodoList />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
