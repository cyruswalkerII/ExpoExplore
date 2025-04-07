import { useEffect, useState, useRef } from "react";
import * as Network from "expo-network";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todosSlice";

export const useNetworkSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isConnected, setIsConnected] = useState(true);
  const wasOffline = useRef(false);

  useEffect(() => {
    const check = async () => {
      const state = await Network.getNetworkStateAsync();
      const online = state.isConnected && state.isInternetReachable;
      setIsConnected(!!online);
      if (wasOffline.current && online) dispatch(fetchTodos());
      wasOffline.current = !online;
    };

    const interval = setInterval(check, 4000);
    check();

    return () => clearInterval(interval);
  }, [dispatch]);

  return { isConnected };
};
