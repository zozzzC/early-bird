export interface OrderModalResponse {
  key: string;
  name: string;
  media: string | null;
  category: string | null;
  extra: itemStringWithId[] | null;
  size: itemStringWithId[] | null;
  milk: itemStringWithId[] | null;
  price: number;
  basePrice: number;
  outOfStock: boolean;
}

export interface itemStringWithId {
  id: string;
  name: string;
  price: number;
}
