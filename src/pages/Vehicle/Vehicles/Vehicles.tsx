import { useEffect } from "react";
import { format } from "date-fns";
import { routes } from "../../../routing/routes";
import Table from "../../../common/Table/Table";
import { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVehicles } from "../../../store/vehicle/actions";
import {
  VehicleStateType,
  resetVehicleUploadStore,
} from "../../../store/vehicle/reducer";
import store from "../../../store/store";
import { VehicleType } from "../../../domain/Vehicle";
import ContentTemplate from "../../../common/ContentTemplate/ContentTemplate";
import Loader from "../../../common/Loader/Loader";
import { GridColDef } from "@mui/x-data-grid";

export type AppDispatch = typeof store.dispatch;

const columns: GridColDef[] = [
  {
    field: "plateNumber",
    headerName: "Plate number",
    type: "string",
    width: 160,
  },
  {
    field: "vehicleType",
    headerName: "Vehicle type",
    type: "string",
    width: 160,
  },
  {
    field: "arrival",
    headerName: "Arrival",
    type: "Date",
    width: 200,
  },
  {
    field: "departure",
    headerName: "Departure",
    type: "Date",
    width: 200,
  },
  {
    field: "timeTotal",
    headerName: "Time (total)",
    width: 150,
  },
  {
    field: "feeTotal",
    headerName: "Fee (total, €)",
    width: 150,
  },
];

export const Vehicles = (): ReactElement => {
  const { vehicles, vehiclesLoading } = useSelector(
    (state: { vehicle: VehicleStateType }) => state.vehicle
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetVehicleUploadStore());
  }, [dispatch]);

  const formatDateTime = (dateAndTime: Date) => {
    const date = new Date(dateAndTime);
    const formattedDateTime = format(date, "yy-MM-dd hh:mm a");

    return formattedDateTime;
  };

  const getFormattedVehicleType = (vehicleType: VehicleType) => {
    if (vehicleType === VehicleType.BusOrTruck) {
      return "Bus/Truck";
    }

    if (vehicleType === VehicleType.Car) {
      return "Car";
    }

    return "Motorcycle";
  };

  const vehiclesRowsData = vehicles
    ? vehicles.map((vehicle, index) => ({
        id: index + 1,
        plateNumber: vehicle.plateNumber.toUpperCase(),
        vehicleType: getFormattedVehicleType(
          vehicle.vehicleType
        ) as VehicleType,
        arrival: formatDateTime(vehicle.arrival),
        departure: vehicle.departure ? formatDateTime(vehicle.departure) : null,
        timeTotal: vehicle.timeTotal ? vehicle.timeTotal : null,
        feeTotal: vehicle.feeTotal ? vehicle.feeTotal : null,
      }))
    : [];

  const topActions = [
    { path: routes.vehicles.upload, title: "Upload vehicle image" },
  ];

  if (vehiclesLoading) {
    return <Loader isLoading />;
  }

  return (
    <ContentTemplate title="Vehicles list" topActions={topActions}>
      <Table rows={vehiclesRowsData} columns={columns} />
    </ContentTemplate>
  );
};

export default Vehicles;
