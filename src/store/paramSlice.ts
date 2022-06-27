import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { format } from "date-fns";

interface ParamState {
  dpp: DateIntervalEicParams;
  aic: DateIntervalEicParams;
  pps: DateIntervalEicParams;
}

const todayFormatted = format(new Date(), "yyyy-MM-dd");
const defaultDateIntervalEicParams: DateIntervalEicParams = {
  startDate: todayFormatted,
  endDate: todayFormatted,
  uevcbEIC: "",
};

const initialState: ParamState = {
  dpp: defaultDateIntervalEicParams,
  aic: defaultDateIntervalEicParams,
  pps: defaultDateIntervalEicParams,
};

const paramSlice = createSlice({
  name: "param",
  initialState,
  reducers: {
    setDateIntervalEicParams(
      state,
      action: PayloadAction<{
        reportKey: string;
        params: DateIntervalEicParams;
      }>
    ) {
      switch (action.payload.reportKey) {
        case "aic":
          state.aic = action.payload.params;
          break;
        case "dpp":
          state.dpp = action.payload.params;
          break;
        case "pps":
          state.pps = action.payload.params;
          break;
        default:
          break;
      }
    },
  },
});

export const { setDateIntervalEicParams } = paramSlice.actions;

export default paramSlice.reducer;
