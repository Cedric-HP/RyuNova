import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state !== undefined) {
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      // Silently fail (private mode, etc.)
    }
  }, [key, state]);

  const setValue = useCallback((value: string) => {
    setState(value);
  }, []);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      // Fail silently
    }
  }, [key]);

  return [state, setValue, remove];
};

export default useLocalStorage;