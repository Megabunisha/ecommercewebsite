import { createSlice } from '@reduxjs/toolkit';
import { PROMO_CODES } from '../../data/products';

// Helper to load cart from localStorage
const loadCartState = () => {
  try {
    const saved = localStorage.getItem('nexus_cart');
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Failed to load cart from localStorage', err);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    promoCode: null,
    discountPercent: 0,
    isDrawerOpen: false,
  };
};

const calculateTotals = (state) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  try {
    localStorage.setItem('nexus_cart', JSON.stringify({
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalAmount: state.totalAmount,
      promoCode: state.promoCode,
      discountPercent: state.discountPercent,
      isDrawerOpen: false,
    }));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
};

const initialState = loadCartState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: quantityToAdd
        });
      } else {
        existingItem.quantity += quantityToAdd;
      }

      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      calculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = Math.min(quantity, item.stock || 99);
        }
      }
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.promoCode = null;
      state.discountPercent = 0;
      calculateTotals(state);
    },

    applyPromo: (state, action) => {
      const code = action.payload.trim().toUpperCase();
      if (PROMO_CODES[code]) {
        state.promoCode = code;
        state.discountPercent = PROMO_CODES[code].discountPercent || 0;
      }
      calculateTotals(state);
    },

    removePromo: (state) => {
      state.promoCode = null;
      state.discountPercent = 0;
      calculateTotals(state);
    },

    toggleCartDrawer: (state, action) => {
      if (typeof action.payload === 'boolean') {
        state.isDrawerOpen = action.payload;
      } else {
        state.isDrawerOpen = !state.isDrawerOpen;
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromo,
  removePromo,
  toggleCartDrawer
} = cartSlice.actions;

export default cartSlice.reducer;
