import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import DateIntervalEicView from "..";
import TextField from "@mui/material/TextField";
import format from "date-fns/format";
import { setDateIntervalEicParams } from "../../../store/paramSlice";
import { useLazyGetAic } from "../../../services/api-service/reportEndpoints";

const Aic = () => {
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.param.aic);
  const [getAic, { isLoading, isFetching }] = useLazyGetAic();

  const [uevcbEIC, setUevcbEIC] = useState<string>(params.uevcbEIC);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(params.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(params.endDate));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startDate &&
      endDate &&
      dispatch(
        setDateIntervalEicParams({
          reportKey: "aic",
          params: {
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
            uevcbEIC: uevcbEIC,
          },
        })
      );
  };

  return (
    <DateIntervalEicView
      title="Available Installed Capacity"
      fetcher={getAic}
      isLoading={isLoading || isFetching}
      params={params}
      formProps={{
        onSubmit: handleSubmit,
        eicValue: uevcbEIC,
        onEicChange: (_, value) => value && setUevcbEIC(value.eic),
        startDateProps: {
          value: startDate,
          onChange: (newValue) => {
            newValue && setStartDate(newValue);
          },
          onError: () => setStartDate(null),
          renderInput: (p) => <TextField {...p} error={!startDate} />,
        },
        endDateProps: {
          value: endDate,
          onChange: (newValue) => {
            newValue && setEndDate(newValue);
          },
          onError: () => setEndDate(null),
          renderInput: (p) => <TextField {...p} error={!endDate} />,
        },
      }}
    />
  );
};

export default Aic;
