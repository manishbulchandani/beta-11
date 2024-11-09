// userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, loginUser, signUpUser } from "./userApis";
import { setUser } from "./userSlice";
import { LoginCredentials, SignUpCredentials, User } from "./userTypes";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
    try {
      const user: User = await loginUser(credentials);
      const token = user.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
      dispatch(setUser(user));
      dispatch(getUserThunk());
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "user/signUp",
  async (credentials: SignUpCredentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await signUpUser(credentials);
      const token = user?.tokens?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const user: User = await getUser();
      return user;
    } catch (error) {
      console.log(error)
      return rejectWithValue("Error Initializing user");
    }
  }
);
