import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";
import { FeeSetting } from "../../domain/FeeSetting";
import { statusToast } from "../../utilities/statusToast";
import { transformError } from "../../utilities/errorTransform";

export type UpdateFeeSettingsProps = {
  id: number;
  feeRate: string;
};

export const fetchFeeSettings = createAsyncThunk(
  "feeSetting/fetchFeeSettings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/fee-settings");

      return response.data as FeeSetting[];
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? "Unknown error";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateFeeSetting = createAsyncThunk(
  "feeSetting/updateFeeSetting",
  async (params: UpdateFeeSettingsProps, thunkAPI) => {
    const { id, feeRate } = params;

    try {
      // If fee rate update was successful, returns response data and shows success message
      const response = await axios.patch(`/fee-settings/${id}`, { feeRate });
      statusToast("Fee rate was successfully updated 🚙");

      return response.data as FeeSetting;
    } catch (err: any) {
      // If update was unsuccessful, returns error and shows error message
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      statusToast(transformError(`${errorMessage.toString()} 🚗`), true);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
