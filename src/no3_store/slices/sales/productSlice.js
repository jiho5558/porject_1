import { createSlice } from "@reduxjs/toolkit";

const initialProduct = {
  id: "",
  productName: "",
  category: "",
  price: "",
  stock: "",
};

const initialState = {
  productTable: [],
  product: initialProduct,
  selectedId: "",
  mode: "",
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },

    selectProduct: (state, action) => {
      state.selectedId = action.payload;
    },

    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  setProduct,
  selectProduct,
  setMode,
} = productSlice.actions;

export default productSlice.reducer;