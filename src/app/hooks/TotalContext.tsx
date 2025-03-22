import { useState, createContext, SetStateAction } from "react";

const [total, setTotal] = useState<number>(0);

export const TotalContext = createContext<{
  total: number;
  setTotal: React.Dispatch<SetStateAction<number>>;
}>({ total: total, setTotal: setTotal });
