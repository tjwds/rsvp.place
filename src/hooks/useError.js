"use client";

import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const { error, setError: originalSetError } = useContext(ErrorContext);
  const setError = (error) => {
    originalSetError(error);
    setTimeout(() => {
      originalSetError("");
    }, 5000);
  };

  return [error, setError];
};
