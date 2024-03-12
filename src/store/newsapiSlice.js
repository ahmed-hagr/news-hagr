import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsApi } from "../apis/api";
import { fetchNewsApiSources } from "../apis/api";
const initialState = {
  articles: [],
  loading: false,
  error: null,
  sources: [],
};

export const fetchNewsaAPIAsync = createAsyncThunk(
  "news/fetchNews",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchNewsApi(
        params.categories,
        params.locale,
        params.search,
        params.published_before,
        params.domains,
        params.type
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchNewsSourcesAPIAsync = createAsyncThunk(
  "news/fetchNewsSourcesAPIAsync",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchNewsApiSources();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
export const newsapiSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsaAPIAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsaAPIAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNewsaAPIAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
      })
      .addCase(fetchNewsSourcesAPIAsync.pending, (state) => {
        // state.loading = true;
      })
      .addCase(fetchNewsSourcesAPIAsync.fulfilled, (state, action) => {
        // state.loading = false;
        state.sources = action.payload;
      })
      .addCase(fetchNewsSourcesAPIAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch news";
      });
  },
});

export default newsapiSlice.reducer;
