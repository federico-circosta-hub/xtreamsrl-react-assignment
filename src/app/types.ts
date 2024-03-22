export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
};
export type CartItem = {
  product: {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    category: string;
  };
  quantity: number;
};
export type CartResponse = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};
