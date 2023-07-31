import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicle/reducer";
import feeSettingReducer from "./feeSetting/reducer";
import authReducer from "./auth/reducer";

// Redux reducers list
const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    feeSetting: feeSettingReducer,
  },
});

export default store;
