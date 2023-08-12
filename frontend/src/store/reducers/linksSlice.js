import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import linksService from "../../services/linksService";

const initialState = {
  links: {
    data: [],
    status: "idle",
    error: "",
  },
};

export const getAllLinks = createAsyncThunk(
  "links/getAllLinks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await linksService.fetchAllLinks(data.username);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message
      );
    }
  }
);

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLinks.pending, (state) => {
        state.links.status = "pending";
        state.links.error = "";
      })
      .addCase(getAllLinks.fulfilled, (state, action) => {
        state.links.status = "idle";
        state.links.error = "";
        state.links.data = action.payload || [];
      })
      .addCase(getAllLinks.rejected, (state, action) => {
        state.links.status = "rejected";
        state.links.error = action.payload;
        state.links.data = [];
      });
  },
});

export const {} = linksSlice.actions;

export default linksSlice.reducer;
