import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUnProps = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (inputs: SignInProps, thunkAPI) => {
    try {
      const response = await axios.post("auth/sign-in", { ...inputs });
      return response.data.token;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (inputs: SignUnProps, thunkAPI) => {
    try {
      const response = await axios.post("auth/sign-up", { ...inputs });
      return response.data.token;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
