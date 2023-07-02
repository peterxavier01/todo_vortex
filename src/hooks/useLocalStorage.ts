import { useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [savedValue, setSavedValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToSave = value instanceof Function ? value(savedValue) : value;
      setSavedValue(valueToSave);
      if (typeof window !== "undefined")
        window.localStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.error(error);
    }
  };

  return [savedValue, setValue];
};

export default useLocalStorage;
