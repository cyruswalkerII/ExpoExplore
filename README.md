This is a fully featured React Native Todo App built with **Expo**, **Redux Toolkit**, and **TypeScript**. It supports offline-first functionality with optimistic UI updates and automatic syncing when the device reconnects to the internet.

---

## Features

- ✅ Add Todos with offline support (synced when back online)
- ✅ Optimistic UI: updates immediately, rolls back if needed
- ✅ Pagination and infinite scroll for large todo lists
- ✅ Swipe to delete with animation
- ✅ Animated checkboxes using Reanimated
- ✅ Floating Action Button (FAB) to add new todos
- ✅ Create Todo screen with navigation
- ✅ Redux Toolkit for global state
- ✅ FlashMessage banners for network/sync status
- ✅ Unit tested with Jest and @testing-library/react-native

---

## Tech Stack

- React Native (via Expo)
- Redux Toolkit
- @react-navigation/native
- expo-network
- react-native-gesture-handler
- react-native-reanimated
- @testing-library/react-native + Jest

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/upgraded-todo-app.git
cd upgraded-todo-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Run the app

```bash
npx expo start
```

Then scan the QR code with the **Expo Go** app on your device.

---

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

---

## 📦 Folder Structure

```
.
├── App.tsx                  # Entry point with navigation and Redux
├── store.ts                 # Redux store setup
├── jest.config.js           # Jest setup
├── jest.setup.js            # Mocks for icons/fonts
├── src/
│   ├── components/          # FAB, TodoItem, TodoList, etc.
│   ├── screens/             # CreateTodoScreen
│   ├── redux/               # todosSlice with offline sync
│   ├── hooks/               # useNetworkSync
│   └── types/               # Type definitions
```

---

## 📥 Todo

- [ ] Enhance Unit Test Coverage
- [ ] Persist queue in AsyncStorage
- [ ] Show badge for offline-created todos
- [ ] Add filter/sort/search

---

## 📄 License

MIT — free to use, customize, and learn from.
