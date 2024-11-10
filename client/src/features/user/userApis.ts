import apiClient from "../../api/api";
import { LoginCredentials, OnboardingDetails, User } from "./userTypes";

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await apiClient.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signUpUser = async (credentials: LoginCredentials): Promise<any> => {
  try {
    const response = await apiClient.post("/users/register", credentials);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get("/users/getUser");
    return response.data;
  } catch (error) {
    console.error('GetUser error:', error);
    throw error; 
  }
};

export const doOnboarding = async (onboardingDetails: OnboardingDetails) => {
  try {
    const response = await apiClient.post("/users/onboarding", onboardingDetails);
    return response.data;
  } catch (error) {
    console.error('Onboarding error:', error);
    throw error;
  }
};


export const fetchUserProfile = async (userId:string|null): Promise<any> => {
  try {
    const response = await apiClient.post("/users/getProfile",{userId});
    return response.data;
  } catch (error) {
    console.error('GetUser error:', error);
    throw error; 
  }
};


export const followOther=async (userId:string|null): Promise<any> => {
  try {
    const response = await apiClient.post("/users/follow",{otherUserId:userId});
    return response.data;
  } catch (error) {
    console.error('GetUser error:', error);
    throw error; 
  }
};


// ////////////////////////////////////////////////////////




export const addDoubt = async (doubtData:FormData) => {
  try {
    const response = await apiClient.post("/doubts/addDoubt", doubtData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('addDoubt error:', error);
    throw error;
  }
};

export const addThread = async (doubtId:string,content:string) => {
  try {
    const response = await apiClient.post("/doubts/addThread",{doubtId,content});
    return response.data;
  } catch (error) {
    console.error('addDoubt error:', error);
    throw error;
  }
};






