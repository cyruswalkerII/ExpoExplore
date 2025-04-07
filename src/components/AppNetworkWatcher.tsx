import React, { useEffect, useRef } from "react";
import { useNetworkSync } from "../hooks/useNetworkSync";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { showMessage, hideMessage } from "react-native-flash-message";

export const AppNetworkWatcher = () => {
  const { isConnected } = useNetworkSync();
  const prevConnected = useRef<boolean | null>(null);

  const loading = useSelector((state: RootState) => state.todos.loading);
  const wasLoading = useRef(false);

  // 🔌 Show message on network changes
  useEffect(() => {
    if (prevConnected.current === null) {
      prevConnected.current = isConnected;
      return;
    }

    if (!isConnected) {
      showMessage({
        message: "No internet connection",
        description: "You are offline. Changes will sync when reconnected.",
        type: "danger",
        icon: "warning",
        duration: 3000,
        hideOnPress: true,
      });
    } else {
      showMessage({
        message: "Back online",
        description: "Syncing with server...",
        type: "success",
        icon: "success",
        duration: 2000,
        hideOnPress: true,
      });
    }

    prevConnected.current = isConnected;
  }, [isConnected]);

  // 🔁 Show syncing banner while fetching
  useEffect(() => {
    if (loading && !wasLoading.current) {
      // just started syncing
      showMessage({
        message: "Syncing...",
        description: "Fetching latest todos from server.",
        type: "info",
        icon: "auto",
        duration: 3000,
        floating: true,
      });
    }

    //if (!loading && wasLoading.current) {
    //  // syncing just finished
    //  hideMessage(); // dismiss any "Syncing..." banner
    //}

    wasLoading.current = loading;
  }, [loading]);

  return null;
};
