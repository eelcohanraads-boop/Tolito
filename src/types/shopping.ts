export interface ShoppingItem {
  id: string;
  name: string;
  /** Where to buy it; null = any store */
  store: string | null;
  /** Comes back on the list every week after it's bought */
  recurring: boolean;
  /** On the list — someone marked it as needed */
  needed: boolean;
  /** Bought on this shopping trip */
  bought: boolean;
}

export interface NewShoppingItem {
  name: string;
  store: string | null;
  recurring: boolean;
}