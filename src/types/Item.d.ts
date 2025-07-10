import { OrderModalResponse } from "./OrderModalResponse";

export type Item = {
  id: string;
  name: string;
  description: string;
  photo: string;
  orderModal: OrderModalResponse;
};
