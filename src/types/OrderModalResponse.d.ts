import { ICartAddOn } from "./Cart";

export interface OrderModalResponse {
  key: string;
  name: string;
  media: string | null;
  category: string | null;
  extra: ICartAddOn[] | null;
  size: ICartAddOn[] | null;
  milk: ICartAddOn[] | null;
  price: number;
  outOfStock: boolean;
}

