import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { ILogin } from 'models';
import { IUserInfo } from 'models/userInfo';
import { RootState } from 'store';

interface IInitialState {
  userInfo: IUserInfo | null;
  token: string | null;
  loading: boolean;
}

export const login = createAsyncThunk(
  'auth/login',
  async (values: ILogin, { rejectWithValue }) => {
    try {
      const res = await authApi.login(values);
      return res.data.token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: IInitialState = {
  userInfo: null,
  token: null,
  loading: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload as string;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
