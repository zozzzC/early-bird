import { useState, createContext, SetStateAction } from "react";

export const TotalContext = createContext<
  {
      total?: number;
      setTotal?: React.Dispatch<SetStateAction<number>>;
    } | undefined
>(undefined);
