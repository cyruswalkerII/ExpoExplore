import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AnimatedCheckbox from "../src/components/AnimatedCheckbox";

describe("AnimatedCheckbox", () => {
  it("should call onToggle when pressed", () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(
      <AnimatedCheckbox checked={false} onToggle={onToggleMock} />,
    );

    const pressable = getByTestId("mock-ionicon");
    fireEvent.press(pressable);
    expect(onToggleMock).toHaveBeenCalled();
  });
});
