import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsorg } from "../apis/api";
import { fetchSourcesNewsorg } from "../apis/api";
const initialState = {
  articles: [],
  loading: false,
  error: null,
  sources: [],
};

export const fetchNewsAsync = createAsyncThunk(
  "news/fetchNewsorg",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchNewsorg(
        params.category,
        params.country,
        params.keyword,
        params.from,
        params.domains,
        params.type
      );
      return response.articles;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchNewsSourceAsync = createAsyncThunk(
  "news/fetchNewsSourceorg",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchSourcesNewsorg();
      return response.sources;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
export const newsorgSlice = createSlice({
  name: "newsorg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
      })
      .addCase(fetchNewsSourceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsSourceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
      })
      .addCase(fetchNewsSourceAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
      });
  },
});

export default newsorgSlice.reducer;
