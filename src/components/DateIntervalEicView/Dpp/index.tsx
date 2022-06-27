import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import DateIntervalEicView from "..";
import TextField from "@mui/material/TextField";
import dpplist from "../../../mock/dpplist.json";
import format from "date-fns/format";
import { setDateIntervalEicParams } from "../../../store/paramSlice";

const Dpp = () => {
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.param.dpp);
  let isFetching = false;
  const [isLoading, setIsLoading] = useState(false);

  const getDpp = () => {
    return dpplist as CapacityValues[];
  };

  const [uevcbEIC, setUevcbEIC] = useState<string>(params.uevcbEIC);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(params.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(params.endDate));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startDate &&
      endDate &&
      dispatch(
        setDateIntervalEicParams({
          reportKey: "dpp",
          params: {
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
            uevcbEIC: uevcbEIC,
          },
        })
      );
    setIsLoading(true);
    await new Promise((_: any) => setTimeout(_, 1000));
    setIsLoading(false);
  };

  return (
    <DateIntervalEicView
      title="Daily Production Program"
      fetcher={getDpp}
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

export default Dpp;
