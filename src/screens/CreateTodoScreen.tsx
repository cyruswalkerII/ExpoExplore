import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as Network from "expo-network";
import { addTodo, enqueueOperation } from "../redux/todosSlice";

const CreateTodoScreen: React.FC = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const netState = await Network.getNetworkStateAsync();
    const isConnected = netState.isConnected && netState.isInternetReachable;
    const newTodo = {
      id: Date.now(),
      todo: trimmed,
      completed: false,
      userId: 1,
    };

    if (isConnected) {
      dispatch(addTodo(newTodo));
    } else {
      dispatch(addTodo(newTodo)); // Optimistically add
      dispatch(enqueueOperation({ type: "add", payload: newTodo }));
    }

    setText("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Todo</Text>
      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        value={text}
        onChangeText={setText}
      />
      <Button title="Create Todo" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 24,
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default CreateTodoScreen;
