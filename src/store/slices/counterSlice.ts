import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

interface IInitialState {
  value: number;
  loading: boolean;
}

const fakeFetching = (amount: number) => {
  return new Promise((res) => {
    setTimeout(() => res(amount), 1000);
  });
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = (await fakeFetching(amount)) as number;
    return response;
  }
);

const initialState: IInitialState = {
  value: 0,
  loading: false
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      incrementAsync.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.value += action.payload;
      }
    );
    builder.addCase(incrementAsync.pending, (state) => {
      state.loading = true;
    });
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterSelector = (state: RootState) => state.counter;

export default counterSlice.reducer;
