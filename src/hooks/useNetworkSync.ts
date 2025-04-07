// src/hooks/useNetworkSync.ts
import { useEffect, useState, useRef } from "react";
import * as Network from "expo-network";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todosSlice";

export const useNetworkSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wasOffline = useRef<boolean>(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkNetwork = async () => {
      const network = await Network.getNetworkStateAsync();
      const online = network.isConnected && network.isInternetReachable;
      setIsConnected(!!online);

      if (wasOffline.current && online) {
        console.log("🔁 Network restored. Syncing todos...");
        dispatch(fetchTodos());
      }

      wasOffline.current = !online;
    };

    intervalId = setInterval(checkNetwork, 5000);
    checkNetwork(); // initial check

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return { isConnected };
};
