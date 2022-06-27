import api from "../services/api-service";
import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import paramReducer from "./paramSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    param: paramReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
