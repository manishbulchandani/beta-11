// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import { getUserThunk, loginThunk } from "./userThunks";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserThunk.fulfilled,(state,action)=>{
      state.isAuthenticated=true;
      state.user=action.payload
    })
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
