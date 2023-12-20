import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAppDispatch = () => useDispatch;
export const useAppSelector = useSelector;

export const useDebounced = ({ searchQuery, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
