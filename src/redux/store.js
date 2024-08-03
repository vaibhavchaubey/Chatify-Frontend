import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice.js';
import api from './api/api.js';
import miscSlice from './reducers/miscSlice.js';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

export default store;
