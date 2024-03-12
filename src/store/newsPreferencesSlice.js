// newsPreferencesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load saved preferences or return initial state
const loadInitialState = () => {
  const savedSources = sessionStorage.getItem('selectedSources');
  const savedCategories = sessionStorage.getItem('selectedCategories');
  return {
    favsources: savedSources ? JSON.parse(savedSources) : [],
    favcategories: savedCategories ? JSON.parse(savedCategories) : [],
  };
};

export const newsPreferencesSlice = createSlice({
  name: 'newsPreferences',
  initialState: loadInitialState(),
  reducers: {
    setSources: (state, action) => {
      state.favsources = action.payload;
      sessionStorage.setItem('selectedSources', JSON.stringify(action.payload));
    },
    setCategories: (state, action) => {
      state.favcategories = action.payload;
      sessionStorage.setItem('selectedCategories', JSON.stringify(action.payload));
    },
  },
});

export const { setSources, setCategories } = newsPreferencesSlice.actions;

export default newsPreferencesSlice.reducer;
