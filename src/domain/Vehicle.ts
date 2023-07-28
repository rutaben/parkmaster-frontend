export enum VehicleType {
  Motorcycle = "MOTORCYCLE",
  Car = "CAR",
  BusOrTruck = "BUS_OR_TRUCK",
}

export interface Vehicle {
  id: number;
  plateNumber: string;
  vehicleType: VehicleType;
  arrival: Date;
  departure: Date | null;
  timeTotal: number | null;
  feeTotal: string | null;
}
