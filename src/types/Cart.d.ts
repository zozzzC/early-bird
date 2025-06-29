export interface ICart {
  [id: string]: ICartItem;
}

export interface ICartItem {
  key: string;
  name: string;
  category: string | null;
  milk: OrderInstanceType<"milk">;
  extra: OrderInstanceType<"extra">;
  size: OrderInstanceType<"size">;
  price: number;
  basePrice: number;
  quantity: number;
}

export interface ICartAddOn {
  id: string;
  name: string;
  price: number;
}

export interface ICartItemWithId extends ICartItem {
  id: string;
}

export type OrderInstanceType<T extends "milk" | "size" | "extra"> =
  T extends "extra" ? ICartAddOn[] | null : ICartAddOn | null;
