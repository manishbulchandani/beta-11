import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  alertText: string;
  alertSeverity: "error" | "warning" | "info" | "success" | null;
  alertVisible: boolean;
}

const initialState: AlertState = {
  alertText: "",
  alertSeverity: null,
  alertVisible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{
        alertText: string;
        alertSeverity: "error" | "warning" | "info" | "success" | null;
      }>
    ) => {
      state.alertText = action.payload.alertText;
      state.alertSeverity = action.payload.alertSeverity;
      state.alertVisible = true;
    },
    closeAlert: (state) => {
      (state.alertText = "");
      state.alertVisible = false;
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
