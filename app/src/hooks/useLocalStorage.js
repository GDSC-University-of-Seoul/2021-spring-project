import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // localStorage에 이미 저장된 값이 있으면 fetch, 없으면 initialValue로 초기화
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // localStorage에 값 저장
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
