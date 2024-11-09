import apiClient from "../../api/api";
import { LoginCredentials, OnboardingDetails, User } from "./userTypes";

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post("/users/login", credentials);
  return response.data; 
};

export const signUpUser = async (credentials: LoginCredentials): Promise<any> => {
  const response = await apiClient.post("/users/register", credentials);
  return response.data; 
};


export const getUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/getUser");
  return response.data; 
};




export const doOnboarding=async(onboardingDetails:OnboardingDetails)=>{
  const response = await apiClient.post("/users/onboarding",onboardingDetails)
  return response.data
}