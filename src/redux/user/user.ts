import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type InitialState = {
  loading: boolean;
  data: User[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  data: [],
  error: "",
};

const rootURL: string = `${import.meta.env.VITE_API_URL}`;

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios.get(rootURL).then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message || "Server Response Error";
    });
  },
});

export default userSlice.reducer;
