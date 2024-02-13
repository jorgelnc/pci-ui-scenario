import { useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi } from 'ag-grid-community';
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { hover } from '@testing-library/user-event/dist/hover';

const columnDefs: ColDef[] = [
  { field: "designation", headerName: "Designation", sortable: true, filter: true },
  {
    field: "discovery_date", headerName: "Discovery Date", sortable: true, filter: true, valueGetter: function (params) {
      const dateStr = params.data.discovery_date;
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-US');
    },
   },
  { field: "h_mag", headerName: "H (mag)", sortable: true, filter:true },
  { field: "moid_au", headerName: "MOID (au)", sortable: true, filter:true },
  { field: "q_au_1", headerName: "q (au)", sortable: true, filter:true },
  { field: "q_au_2", headerName: "Q (au)", sortable: true, filter:true },
  { field: "period_yr", headerName: "Period (yr)", sortable: true, filter:true },
  { field: "i_deg", headerName: "Inclination (deg)", sortable: true, filter:true },
  { field: "pha", headerName: "Potentially Hazardous", sortable: true, filter: true, valueFormatter: function (params) {
      if (params.value === 'Y') {
        return 'Yes';
      } else if (params.value === 'N') {
        return 'No';
      } else {
        return '';
      }
    }
 },
  { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, sortable: true, filter: true },
];


const NeoGrid = (): JSX.Element => {

const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const clearFiltersAndSorts = () => {
    if (gridApi) {
      gridApi.setFilterModel(null); // Clear all filter models
       const columnDefs = gridApi.getColumnDefs() || []; // Provide a default value if undefined
    gridApi.setColumnDefs(columnDefs.map(columnDef => {
      return {
        ...columnDef,
        sort: null
      };
    }));
    }
  }

   return (
     <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
       <div className='main_title-button' style={{ display: 'flex', gap: '15px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: "1px solid var(--ag-border-color)", padding: '10px', marginBottom: '10px'}}>
       <h2 className="title-main" style={{ textAlign: "center", padding: "5px" }}>Near-Earth Object Overview</h2>
       <button className="button_clear" style={{display: 'flex', justifyContent: 'center', padding:'5px', height:'20px', alignItems: 'center', borderRadius: '10px', borderStyle: 'none', marginBottom: '10px', cursor: 'pointer'}} onClick={clearFiltersAndSorts}>Clear Filters and Sorters</button>
       </div>
         <AgGridReact
         rowData={data}
         columnDefs={columnDefs}
         rowGroupPanelShow={'always'}
         enableCellTextSelection={true}
         onGridReady={(params) => setGridApi(params.api)}
      />
    </div>
  );
};

export default NeoGrid;
