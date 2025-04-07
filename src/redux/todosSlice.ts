// src/redux/todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Async thunk to fetch todos from the API and save them to AsyncStorage
export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    const todos: Todo[] = data.todos;
    await AsyncStorage.setItem("TODOS", JSON.stringify(todos));
    return todos;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Async thunk to load todos from AsyncStorage
export const loadTodosFromStorage = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/loadTodosFromStorage", async (_, { rejectWithValue }) => {
  try {
    const storedTodos = await AsyncStorage.getItem("TODOS");
    return storedTodos ? (JSON.parse(storedTodos) as Todo[]) : [];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo(state, action: PayloadAction<number>) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch todos";
      })
      // loadTodosFromStorage
      .addCase(
        loadTodosFromStorage.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
        },
      )
      .addCase(loadTodosFromStorage.rejected, (state, action) => {
        state.error = action.payload || "Failed to load todos from storage";
      });
  },
});

export const { toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
