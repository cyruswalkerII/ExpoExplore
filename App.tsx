import React from "react";
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./store";
import TodoList from "./src/components/TodoList";
import FlashMessage from "react-native-flash-message";
import { AppNetworkWatcher } from "./src/components/AppNetworkWatcher";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>📋 Todo List</Text>
          <TodoList />
          <AppNetworkWatcher />
          <FlashMessage position="top" />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 16,
  },
});

export default App;
