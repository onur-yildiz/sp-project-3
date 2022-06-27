import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CustomMuiGrid from "../CustomMuiGrid";
import DateIntervalInput from "../DateIntervalInput";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useGetInjectionUnit } from "../../services/api-service/reportEndpoints";

export interface DateIntervalEicFormProps {
  startDateProps: DatePickerProps<Date | null>;
  endDateProps: DatePickerProps<Date | null>;
  eicValue: string;
  onEicChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: InjectionUnit | null
  ) => void;
  onSubmit: (e: React.FormEvent<Element>) => void;
}

const DateIntervalEicForm = (props: DateIntervalEicFormProps) => {
  const { startDateProps, endDateProps, onSubmit, onEicChange, eicValue } =
    props;
  const { data: injectionUnits, isLoading } = useGetInjectionUnit();

  return (
    <CustomMuiGrid component="form" variant="large" onSubmit={onSubmit}>
      <CustomMuiGrid
        disablePaper
        direction="row"
        stackProps={{ justifyContent: "flex-start" }}
      >
        <DateIntervalInput
          startDateProps={startDateProps}
          endDateProps={endDateProps}
        />
      </CustomMuiGrid>
      <CustomMuiGrid disablePaper variant="large" direction="row">
        {injectionUnits && (
          <Autocomplete
            sx={{ flexGrow: 1 }}
            disablePortal
            id="dpp-iun-select"
            value={
              injectionUnits.find((iun) => iun.eic === eicValue) ??
              injectionUnits[0]
            }
            options={injectionUnits}
            loading={isLoading}
            getOptionLabel={(option) => `${option.name} (${option.eic})`}
            onChange={onEicChange}
            renderInput={(params) => (
              <TextField {...params} label="Injection Unit Name" />
            )}
          />
        )}
        <Button
          disabled={!startDateProps.value || !endDateProps.value}
          type="submit"
          size="large"
          variant="contained"
          disableElevation
        >
          Apply
        </Button>
      </CustomMuiGrid>
    </CustomMuiGrid>
  );
};

export default DateIntervalEicForm;
