import { loginRequest as loginReq, loginResponse, RegisterRequestBody } from "../@types/auth";
import { Endpoints } from "../constants/endpoint";
import axios from "./axios";

export const loginRequest = async (loginRequest:loginReq): Promise<loginResponse> => {
  const response = await axios.post(Endpoints.LOGIN_URL, loginRequest);

  return response.data;
};

export const registerRequest = async (registerRequestBody:RegisterRequestBody) => {
  const response = await axios.post(Endpoints.REGISTER_URL, registerRequestBody);

  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await axios.get(Endpoints.REFRESH_URL, {
    withCredentials: true,
  });

  return response.data;
};

export const logoutRequest = async () => {
  const response = await axios.post(Endpoints.LOGOUT_URL);

  return response.data;
};
