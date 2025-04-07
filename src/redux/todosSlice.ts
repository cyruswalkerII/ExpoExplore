import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../types";

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

interface AddOperation {
  type: "add";
  payload: Todo;
}

type PendingOperation =
  | AddOperation
  | { type: "toggle" | "delete"; id: number };

export const fetchTodos = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://dummyjson.com/todos");
    const data = await res.json();
    await AsyncStorage.setItem("TODOS", JSON.stringify(data.todos));
    return data.todos;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const loadTodosFromStorage = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/loadTodosFromStorage", async (_, { rejectWithValue }) => {
  try {
    const raw = await AsyncStorage.getItem("TODOS");
    return raw ? JSON.parse(raw) : [];
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      })
      .addCase(loadTodosFromStorage.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { toggleTodo, deleteTodo, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
