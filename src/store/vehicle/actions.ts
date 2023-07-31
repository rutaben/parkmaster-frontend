import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/Axios/axios-instance";
import { Vehicle } from "../../domain/Vehicle";
import { statusToast } from "../../utilities/statusToast";
import { transformError } from "../../utilities/errorTransform";

export const fetchVehicles = createAsyncThunk(
  "vehicle/fetchVehicles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/vehicles");

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

      // If upload was successful, returns response data and shows success message
      const response = await axios.post("/vehicles/upload", body);
      statusToast("Vehicle was successfully uploaded 🚙");

      return response.data as any;
    } catch (err: any) {
      // If upload was unsuccessful, returns error and shows error message
      const errorMessage = err.response.data.message;
      statusToast(transformError(`${errorMessage.toString()} 🚗`), true);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
