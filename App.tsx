import React from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { store } from "./store";
import TodoList from "./src/components/TodoList";
import FlashMessage from "react-native-flash-message";
import { AppNetworkWatcher } from "./src/components/AppNetworkWatcher"; // we'll create this next

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>📋 Todo List</Text>
          <TodoList />
          <AppNetworkWatcher /> {/* watches and shows flash messages */}
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
