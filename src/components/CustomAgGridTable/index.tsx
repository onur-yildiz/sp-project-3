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
  const [columnDefs] = useState<ColDef[]>(
    Object.getOwnPropertyNames(props.data[0]).map((prop) => ({
      field: prop,
      resizable: true,
      flex: 1,
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
