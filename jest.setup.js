// jest.setup.js

// Silence Ionicons errors in test environment
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const View = require("react-native").View;

  return {
    Ionicons: (props) => (
      <View {...props} role="button" testID="mock-ionicon" />
    ),
    // Add others if needed: MaterialIcons, FontAwesome, etc.
  };
});
