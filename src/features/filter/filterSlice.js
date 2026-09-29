import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: 'all',
  maxPrice: 800,
  sortBy: 'featured', // 'featured', 'price-asc', 'price-desc', 'rating'
  inStockOnly: false,
  minRating: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setInStockOnly: (state, action) => {
      state.inStockOnly = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.maxPrice = 800;
      state.sortBy = 'featured';
      state.inStockOnly = false;
      state.minRating = 0;
    }
  }
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setMaxPrice,
  setSortBy,
  setInStockOnly,
  setMinRating,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
