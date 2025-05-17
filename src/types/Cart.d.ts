export interface ICart {
  [id: string]: ICartItem;
}

export interface ICartItem {
  key: string;
  name: string;
  category: string;
  milk: null | ICartAddOn;
  extra: null | ICartAddOn[];
  size: null | ICartAddOn;
  price: number;
}

export interface ICartAddOn {
  id: string;
  name: string;
  price: number;
}
