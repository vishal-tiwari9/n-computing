import { type CartItem } from "./cart-store";

export const RX300 = {
  id: "prod_rx300",
  name: "NComputing RX300 Thin Client",
  price: 8999,
  description: "Enterprise thin client based on Raspberry Pi 3 for vSpace Pro.",
};

export function toCartItem(quantity: number = 1): CartItem {
  return {
    id: `item_${Date.now()}`,
    productId: RX300.id,
    name: RX300.name,
    price: RX300.price,
    quantity,
  };
}
