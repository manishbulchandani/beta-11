// userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signUpUser } from "./userApis";
import { setUser } from "./userSlice";
import { LoginCredentials, User } from "./userTypes";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const user: User = await loginUser(credentials);
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "user/signUp",
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const user: User = await signUpUser(credentials);
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);
