import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import sortReducer from './sortSlice';
import ticketsReducer from './ticketsSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
});
