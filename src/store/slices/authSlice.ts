import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

export const getUserInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (empty, { rejectWithValue }) => {
    try {
      const res = await authApi.getUserInfo();
      return res;
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
  reducers: {
    logout(state) {
      state.token = null;
      state.userInfo = null;
    }
  },
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

    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload as IUserInfo;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.userInfo = null;
      state.loading = false;
      state.token = null;
    });
  }
});

export const { logout } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
