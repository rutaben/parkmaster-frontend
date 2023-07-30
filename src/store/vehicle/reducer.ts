import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpError } from "../../services/Axios/axios-instance";
import { Vehicle } from "../../domain/Vehicle";
import { fetchVehicles, uploadVehicle } from "./actions";

export type VehicleStateType = {
  vehicles: Vehicle[] | null;
  vehiclesLoading: boolean;
  vehiclesError: HttpError | string | null;
  vehicleUploadLoading: boolean;
  vehicleUploadError: HttpError | string | null;
  uploadedVehicle: Vehicle | null;
};

export const initialState: VehicleStateType = {
  vehicles: null,
  vehiclesLoading: true,
  vehiclesError: null,
  vehicleUploadLoading: false,
  vehicleUploadError: null,
  uploadedVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    resetVehicleUploadStore: (state) => {
      state.vehicleUploadLoading = false;
      state.vehicleUploadError = null;
      state.uploadedVehicle = null;
    },
    resetVehicleStore: (state) => {
      state.vehicles = null;
      state.vehiclesLoading = true;
      state.vehiclesError = null;
      state.vehicleUploadLoading = false;
      state.vehicleUploadError = null;
      state.uploadedVehicle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.vehiclesLoading = true;
      })
      .addCase(
        fetchVehicles.fulfilled,
        (state, action: PayloadAction<Vehicle[]>) => {
          state.vehicles = action.payload;
          state.vehiclesLoading = false;
          state.vehiclesError = null;
        }
      )
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.vehiclesLoading = false;
        state.vehiclesError = action.payload as string;
      })

      .addCase(uploadVehicle.pending, (state) => {
        state.vehicleUploadLoading = true;
      })
      .addCase(uploadVehicle.fulfilled, (state, action: PayloadAction<any>) => {
        state.uploadedVehicle = action.payload;
        state.vehicleUploadLoading = false;
        state.vehicleUploadError = null;
      })
      .addCase(uploadVehicle.rejected, (state, action) => {
        state.vehicleUploadLoading = false;
        state.vehicleUploadError = action.payload as string;
      });
  },
});

export const { resetVehicleUploadStore, resetVehicleStore } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
