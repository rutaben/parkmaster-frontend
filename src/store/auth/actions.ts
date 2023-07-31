import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";
import { statusToast } from "../../utilities/statusToast";
import { transformError } from "../../utilities/errorTransform";

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
      statusToast(transformError(`${errorMessage.toString()} 🚗`), true);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (inputs: SignUnProps, thunkAPI) => {
    try {
      // Sends post request to a specifiend endpoint through controller and waits for the response
      const response = await axios.post("auth/sign-up", { ...inputs });
      // Currently only login generates userToken therefore user is asked to Sign In separately
      statusToast(
        "Sign Up was successful. Please Sign In with your credentials 🚙"
      );

      return response.data.token;
    } catch (err: any) {
      // Uses the rejectWithValue method to provide the error message as the payload
      // for the rejected action so that it can be accessed in the Redux store
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      statusToast(transformError(`${errorMessage.toString()} 🚗`), true);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
