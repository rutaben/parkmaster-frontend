import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "./Table.module.scss";

export type VehicleProps = {
  rows: any;
  columns: GridColDef[];
};

const CustomNoRowsOverlay = () => <div>No data to show</div>;

const Table = ({ rows, columns }: VehicleProps) => {
  return (
    <div className={styles.tableContainer}>
      <DataGrid
        // Data Grid component, defines what happens when rows are empty
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={rows}
        columns={columns}
        // Defines default page and items per page
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </div>
  );
};

export default Table;
