import { CartResponse, Product } from "../app/types";

export function checkCartFirst(arr: Product[], cart: CartResponse) {
  let newArr = arr.map((p) => {
    let targetProduct = cart.items.find((i) => i.product.id === p.id);
    if (targetProduct) return { ...p, itemInCart: targetProduct.quantity };
    else return p;
  });
  return newArr;
}
