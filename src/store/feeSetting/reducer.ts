import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeeSetting } from "../../domain/FeeSetting";
import { fetchFeeSettings, updateFeeSetting } from "./actions";

export type FeeSettingStateType = {
  feeSettings: FeeSetting[] | null;
  feeSettingsLoading: boolean;
  feeSettingsError: Array<{ [key: string]: string }> | string | null;
  feeSettingLoading: boolean;
  feeSettingError: Array<{ [key: string]: string }> | string | null;
  updatedFee: any;
};

export const initialState: FeeSettingStateType = {
  feeSettings: null,
  feeSettingsLoading: true,
  feeSettingsError: null,
  feeSettingLoading: false,
  feeSettingError: null,
  updatedFee: null,
};

const feeSettingSlice = createSlice({
  name: "feeSetting",
  initialState,
  reducers: {
    resetFeeSettingStore: (state) => {
      state.feeSettings = null;
      state.feeSettingsLoading = true;
      state.feeSettingsError = null;
      state.feeSettingLoading = false;
      state.feeSettingError = null;
      state.updatedFee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeSettings.pending, (state) => {
        state.feeSettingsLoading = true;
      })
      .addCase(
        fetchFeeSettings.fulfilled,
        (state, action: PayloadAction<FeeSetting[]>) => {
          state.feeSettings = action.payload;
          state.feeSettingsLoading = false;
          state.feeSettingsError = null;
        }
      )
      .addCase(fetchFeeSettings.rejected, (state, action) => {
        state.feeSettingsLoading = false;
        state.feeSettingsError = action.payload as string;
      })

      .addCase(updateFeeSetting.pending, (state) => {
        state.feeSettingLoading = true;
      })
      .addCase(
        updateFeeSetting.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.updatedFee = action.payload;
          state.feeSettingLoading = false;
          state.feeSettingError = null;
        }
      )
      .addCase(updateFeeSetting.rejected, (state, action) => {
        state.feeSettingLoading = false;
        state.feeSettingError = action.payload as string;
      });
  },
});

export const { resetFeeSettingStore } = feeSettingSlice.actions;

export default feeSettingSlice.reducer;
