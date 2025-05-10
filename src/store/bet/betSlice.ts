import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BetEvent } from '../../types/bet';
import { League } from 'types/league';

interface BetState {
  cart: BetEvent[];
  events: BetEvent[];
  leagues: League[];
  loading: boolean;
  error: string | null;
}

const initialState: BetState = {
  cart: [],
  events: [],
  leagues: [],
  loading: false,
  error: null,
};

const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BetEvent>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(bet => bet.id !== action.payload);
    },
    setEvents: (state, action: PayloadAction<BetEvent[]>) => {
      state.events = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLeagues: (state, action: PayloadAction<League[]>) => {
      state.leagues = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setEvents, setLoading, setError, setLeagues } = betSlice.actions;
export default betSlice.reducer; 