import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import { attachToken } from "../api/axios";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
    },
});

attachToken(() => localStorage.getItem("token"));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

