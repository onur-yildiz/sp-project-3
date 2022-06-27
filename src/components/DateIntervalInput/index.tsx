import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { FC, Fragment } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface DateIntervalInputProps {
  startDateProps: DatePickerProps<Date | null>;
  endDateProps: DatePickerProps<Date | null>;
}

const DateIntervalInput: FC<DateIntervalInputProps> = (
  props: DateIntervalInputProps
) => {
  const { startDateProps, endDateProps } = props;
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          disableFuture
          shouldDisableDate={(date) =>
            !endDateProps.value || !date || date > endDateProps.value
          }
          {...startDateProps}
        />
        <DatePicker label="End Date" {...endDateProps} />
      </LocalizationProvider>
    </Fragment>
  );
};

export default DateIntervalInput;
