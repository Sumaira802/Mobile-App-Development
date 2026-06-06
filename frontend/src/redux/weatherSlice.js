import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",

  initialState: {
    currentWeather: null,
    forecast: [],
  },

  reducers: {
    setWeather: (state, action) => {
      state.currentWeather =
        action.payload;
    },

    setForecast: (state, action) => {
      state.forecast =
        action.payload;
    },
  },
});

export const {
  setWeather,
  setForecast,
} = weatherSlice.actions;

export default weatherSlice.reducer;