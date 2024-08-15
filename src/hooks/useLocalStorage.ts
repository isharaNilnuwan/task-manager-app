"use client";

import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving value from local storage", error);
      return initialValue;
    }
  };

  
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);


  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting value to local storage", error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;