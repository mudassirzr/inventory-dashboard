import { createSlice } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types/product";

const productsSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {
    addProduct(state: ProductState, action) {
      state[action.payload.id] = {
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        price: action.payload.price,
        quantity: action.payload.quantity,
        currency: action.payload.currency,
        disabled: action.payload?.disabled,
      };
    },
    addProducts(state: ProductState, action) {
      action.payload.forEach((product: Product) => {
        state[product.id] = {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
          currency: product.currency,
          disabled: product?.disabled,
        };
      });
    },
    editProduct(state: ProductState, action) {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
      };
    },
    deleteProduct(state: ProductState, action) {
      delete state[action.payload];
    },
    disableProduct(state: ProductState, action) {
      state[action.payload] = {
        ...state[action.payload],
        disabled: !state[action.payload]?.disabled,
      };
    },
  },
});

export const {
  addProduct,
  addProducts,
  editProduct,
  deleteProduct,
  disableProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
