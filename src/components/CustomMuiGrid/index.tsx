import { FormEvent, PropsWithChildren } from "react";
import Grid, { GridProps } from "@mui/material/Grid";
import Stack, { StackProps } from "@mui/material/Stack";

import Paper from "@mui/material/Paper";

interface CustomMuiGridProps {
  variant?: "large" | "medium" | "small";
  direction?: "row" | "column";
  disablePaper?: boolean;
  stackProps?: StackProps;
  component?: "form" | "div";
  onSubmit?: (e: FormEvent) => void;
}

const CustomMuiGrid = (props: PropsWithChildren<CustomMuiGridProps>) => {
  const getVariantProps = () => {
    switch (props.variant) {
      case "large":
        return largeGridProps;
      case "medium":
        return mediumGridProps;
      case "small":
        return smallGridProps;
      default:
        return {};
    }
  };

  const children = (
    <Stack
      component={props.component ?? "div"}
      onSubmit={props.onSubmit}
      direction={props.direction}
      spacing={3}
      justifyContent="space-between"
      {...props.stackProps}
    >
      {props.children}
    </Stack>
  );

  return (
    <Grid item {...getVariantProps()}>
      {props.disablePaper ? children : <Paper sx={{ p: 2 }}>{children}</Paper>}
    </Grid>
  );
};

const largeGridProps: GridProps = { xs: 12 };
const mediumGridProps: GridProps = { xs: 12, sm: 8, md: 6 };
const smallGridProps: GridProps = { xs: 12, sm: 2, md: 3 };

export default CustomMuiGrid;
