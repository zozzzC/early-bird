import { useContext } from "react";
import { TotalContext } from "./TotalContext";

export const useTotalContext = () => {
  const totalContext = useContext(TotalContext);

  if (totalContext == undefined) {
    throw new Error("Total context must be wrapped in provider");
  }

  return totalContext;
};
