import { VehicleType } from "./Vehicle";
import { Weekday } from "./Weekday";

export interface FeeSetting {
  id: number;
  vehicleType: VehicleType;
  weekday: Weekday;
  feeRate: string;
}
