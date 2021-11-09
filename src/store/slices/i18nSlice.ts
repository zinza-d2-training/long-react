import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface IInitialState {
  languageMode: 'vn' | 'en';
}

const initialState: IInitialState = {
  languageMode: 'vn'
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    changeLanguageMode(state, action: PayloadAction<'vn' | 'en'>) {
      state.languageMode = action.payload;
    }
  }
});

export const { changeLanguageMode } = i18nSlice.actions;
export const i18nSelector = (state: RootState) => state.i18n;

export default i18nSlice.reducer;
