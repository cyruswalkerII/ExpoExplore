import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TodoList from "../components/TodoList";
import FlashMessage from "react-native-flash-message";
import { AppNetworkWatcher } from "../components/AppNetworkWatcher";
import CreateTodoButton from "../components/CreateTodoButton";

const HomeScreen = ({ navigation }: any) => (
  <View style={styles.wrapper}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📋 Todo List</Text>
      <TodoList />
      <AppNetworkWatcher />
      <FlashMessage position="top" />
    </SafeAreaView>

    {/* FAB outside SafeArea to prevent overlap */}
    <CreateTodoButton onPress={() => navigation.navigate("CreateTodo")} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative", // 🧠 important for absolute children like FAB
  },
  container: {
    flex: 1,
    paddingBottom: 100, // ⬅ ensures FAB isn't covering list items
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 16,
  },
});

export default HomeScreen;
