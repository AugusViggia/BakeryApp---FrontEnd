import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./slice/homeSlice";
import { firebaseApi } from "../firebase/services/firebaseApi";
import authSlice from "./slice/authSlice";

export const store = configureStore({
    reducer: {
        homeSlice,
        [firebaseApi.reducerPath]: firebaseApi.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(firebaseApi.middleware),
});
