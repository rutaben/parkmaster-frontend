import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";
import { Vehicle } from "../../domain/Vehicle";

export const fetchVehicles = createAsyncThunk(
  "vehicle/fetchVehicles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/vehicles");
      console.log(response);
      return response.data as Vehicle[];
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? "Unknown error";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const uploadVehicle = createAsyncThunk(
  "vehicle/uploadVehicle",
  async (file: File, thunkAPI) => {
    try {
      const body = new FormData();
      body.append("file", file);

      const response = await axios.post("/vehicles/upload", body);
      return response.data as any;
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
