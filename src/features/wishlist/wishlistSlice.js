import { createSlice } from '@reduxjs/toolkit';

const loadWishlistState = () => {
  try {
    const saved = localStorage.getItem('nexus_wishlist');
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Failed to load wishlist from localStorage', err);
  }
  return { items: [] };
};

const initialState = loadWishlistState();

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      try {
        localStorage.setItem('nexus_wishlist', JSON.stringify({ items: state.items }));
      } catch (err) {
        console.error('Failed to save wishlist', err);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      try {
        localStorage.removeItem('nexus_wishlist');
      } catch (err) {
        console.error('Failed to clear wishlist', err);
      }
    }
  }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
