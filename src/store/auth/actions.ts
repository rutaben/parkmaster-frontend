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
      // Sends post request to a specifiend endpoint through controller and waits for the response
      const response = await axios.post("auth/sign-in", { ...inputs });
      return response.data.token;
    } catch (err: any) {
      // Uses the rejectWithValue method to provide the error message as the payload
      // for the rejected action so that it can be accessed in the Redux store
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
      // Sends post request to a specifiend endpoint through controller and waits for the response
      return response.data.token;
    } catch (err: any) {
      // Uses the rejectWithValue method to provide the error message as the payload
      // for the rejected action so that it can be accessed in the Redux store
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
