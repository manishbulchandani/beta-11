import apiClient from "../../api/api";
import { LoginCredentials, User } from "./userTypes";

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post("/users/login", credentials);
  return response.data; 
};

export const signUpUser = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post("/users/register", credentials);
  return response.data; 
};
