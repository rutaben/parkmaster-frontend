import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";
import { FeeSetting } from "../../domain/FeeSetting";

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

    console.log(feeRate);

    try {
      const response = await axios.patch(`/fee-settings/${id}`, { feeRate });
      return response.data as FeeSetting;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
