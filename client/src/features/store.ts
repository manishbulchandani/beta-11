import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import alertReducer from "./appFeatures/alertSlice"
// import adminReducer from "./admin/adminSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    alert:alertReducer
    // admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
