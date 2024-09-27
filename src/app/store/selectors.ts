// selectors.ts
import { createSelector } from "reselect";
import { RootState } from "./store";

const selectCartItems = (state: RootState) => state.cart.cart;

export const selectTotalProducts = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
);

export const selectTotalProductsPriceInCents = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.priceInCents * item.quantity,
      0
    );
  }
);
