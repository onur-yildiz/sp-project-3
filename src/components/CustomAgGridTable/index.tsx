import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";

import { ColDef, GridOptions } from "ag-grid-enterprise";

import { AgGridReact } from "ag-grid-react";
import Box from "@mui/material/Box";
import { useState } from "react";

interface DateIntervalEicTableProps {
  data: any[];
}

const CustomAgGridTable = (props: DateIntervalEicTableProps) => {
  const propNames = Object.getOwnPropertyNames(props.data[0]);
  const [columnDefs] = useState<ColDef[]>(
    propNames.map((prop, i) => ({
      field: prop,
      resizable: true,
      minWidth: 120,
      flex: propNames.length - 1 === i ? 1 : 0,
    }))
  );

  const gridOptions: GridOptions = {
    columnDefs,
  };

  return (
    <Box sx={{ height: "90vh" }} className="ag-theme-material">
      <AgGridReact gridOptions={gridOptions} rowData={props.data} />
    </Box>
  );
};

export default CustomAgGridTable;
