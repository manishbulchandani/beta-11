// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./userTypes";
import { getUserThunk, loginThunk } from "./userThunks";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing:boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isInitializing:false
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
    setInitialized(state){
      state.isInitializing=false
    } 
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserThunk.fulfilled,(state,action)=>{
      state.isAuthenticated=true;
      state.user=action.payload
      state.isInitializing=false
    })
    .addMatcher(
      (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
      (state) => {
        state.isInitializing = false;
      }
    );
  },
});

export const { setUser, logoutUser,setInitialized} = userSlice.actions;
export default userSlice.reducer;
