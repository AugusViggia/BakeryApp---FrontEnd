import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart"));

const homeSlice = createSlice({
  name: "home",
  initialState: {
    allProducts: [],
    cartList: savedCart || [],
  },
  reducers: {
    setSetectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    getProductById: (state, action) => {
      const product = state.allProducts.find(
        (product) => product.id === action.payload
      );
      return product;
    },
    addToCart: (state, action) => {
      state.cartList = [...state.cartList, action.payload];
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productIndex = state.cartList.findIndex(
        (product) => product.id === productId
      );

      if (productIndex !== -1) {
        state.cartList[productIndex].quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    emptyCart: (state, action) => {
      state.cartList = [];
    },
  },
});

export const {
    setSetectedProduct,
    getProductById,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
} = homeSlice.actions;

export default homeSlice.reducer;
