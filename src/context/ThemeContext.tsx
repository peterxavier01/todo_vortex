/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { ThemeContextType } from "../model";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext<ThemeContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [savedValue, setValue] = useLocalStorage("theme", "dark");
  const handleToggleChange = () => {
    savedValue === "light" ? setValue("dark") : setValue("light");
  };

  return (
    <ThemeContext.Provider value={{ theme: savedValue, handleToggleChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be provided within the ThemeProvider"
    );
  }
  return context;
};

export default ThemeContext;
