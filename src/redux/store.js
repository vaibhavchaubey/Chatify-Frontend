import { configureStore } from '@reduxjs/toolkit';
import api from './api/api.js';
import authSlice from './reducers/authSlice.js';
import miscSlice from './reducers/miscSlice.js';
import chatSlice from './reducers/chatSlice.js';

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

export default store;
