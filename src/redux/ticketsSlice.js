import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  stop: false,
  searchId: '',
  value: 5,
  loading: false,
  error: '',
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function fetchThunk(id) {
    let searchId = id

    if (!searchId) {
        searchId = await fetch('https://aviasales-test-api.kata.academy/search').then((response) => response.json()).then((data) => data.searchId)
    }

    let tickets

    try {
        tickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`).then((response) => response.json())
    } catch (error) {
        tickets = await fetchThunk(searchId)
    }
    return {...tickets, searchId}
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    increaseValue: (state) => {
      state.value += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const {tickets, stop, searchId} = action.payload 
        state.tickets = state.tickets.concat(tickets)
        state.stop = stop
        state.searchId = searchId
        state.loading = false;
        state.error = ''
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.tickets = []
        state.error = action.error.message;
      });
  },
});

export const { increaseValue } = ticketsSlice.actions;
export default ticketsSlice.reducer;