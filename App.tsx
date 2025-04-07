import React from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import HomeScreen from "./src/screens/HomeScreen";
import CreateTodoScreen from "./src/screens/CreateTodoScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              name="CreateTodo"
              component={CreateTodoScreen}
              options={{ title: "Add Todo" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
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
