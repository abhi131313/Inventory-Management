import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async () => {
    const response = await axios.get(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    isAdmin: true,
  },
  reducers: {
    toggleAdminMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
    deleteProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (productIndex !== -1) {
        state.products.splice(productIndex, 1);
      }
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    toggleProductDisabled: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.disabled = !product.disabled;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  toggleAdminMode,
  deleteProduct,
  updateProduct,
  toggleProductDisabled,
} = inventorySlice.actions;

export default inventorySlice.reducer;
