import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true },
  { field: "discovery_date", headerName: "Discovery Date", sortable: true },
  { field: "h_mag", headerName: "H (mag)", sortable: true },
  { field: "moid_au", headerName: "MOID (au)", sortable: true },
  { field: "q_au_1", headerName: "q (au)", sortable: true },
  { field: "q_au_2", headerName: "Q (au)", sortable: true },
  { field: "period_yr", headerName: "Period (yr)", sortable: true },
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, sortable: true },
];

const NeoGrid = (): JSX.Element => {
   return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h2 className="title-main" style={{ textAlign: "center", border: "1px solid var(--ag-border-color)", padding: "5px"}}>Near-Earth Object Overview</h2>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
      />
    </div>
  );
};

export default NeoGrid;
