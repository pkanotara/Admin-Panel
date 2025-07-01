// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
// import your reducers here
// import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer
  },
});

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
