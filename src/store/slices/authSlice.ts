import { createSlice } from '@reduxjs/toolkit';

import { IUserInfo } from 'models/userInfo';
import { RootState } from 'store';

interface IInitialState {
  userInfo: IUserInfo | null;
  token: string | null;
  loading: boolean;
}

const initialState: IInitialState = {
  userInfo: null,
  token: null,
  loading: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
