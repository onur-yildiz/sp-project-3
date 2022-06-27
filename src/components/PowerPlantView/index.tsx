import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Container from "@mui/material/Container";
import CustomAgGridTable from "../CustomAgGridTable";
import CustomMuiGrid from "../CustomMuiGrid";
import DateIntervalEicForm from "../DateIntervalEicForm";
import LineChart from "../charts/LineChart";
import LineChartSkeleton from "../charts/LineChart/Skeleton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import dateIntervalEicConfig from "../../config/charts/date-interval-eic-config";
import { format } from "date-fns";
import santral from "../../mock/santral.json";
import { setDateIntervalEicParams } from "../../store/paramSlice";

const PowerPlantView = () => {
  const dppConfig = dateIntervalEicConfig();
  const aicConfig = dateIntervalEicConfig();
  const dispatch = useAppDispatch();
  const params = useAppSelector((state) => state.param.pps);
  let isFetching = false;
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<SantralResponse>();

  const [tabValue, setTabValue] = useState("dpp");
  const [uevcbEIC, setUevcbEIC] = useState<string>(params.uevcbEIC);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(params.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(params.endDate));

  const handleTabChange = (_: any, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startDate &&
      endDate &&
      dispatch(
        setDateIntervalEicParams({
          reportKey: "pps",
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

  useEffect(() => {
    if (!params.startDate || !params.endDate || !params.uevcbEIC) return;

    const fetchData = async () => {
      try {
        setData(santral as SantralResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  aicConfig.chartOptions.plugins!.title!.text =
    "Available Installed Capacity Total";
  dppConfig.chartOptions.plugins!.title!.text =
    "Daily Production Program Total";

  return (
    <Stack spacing={3}>
      <Container>
        <Stack spacing={3}>
          <DateIntervalEicForm
            onSubmit={handleSubmit}
            eicValue={uevcbEIC}
            onEicChange={(_, value) => value && setUevcbEIC(value.eic)}
            startDateProps={{
              value: startDate,
              onChange: (newValue) => {
                newValue && setStartDate(newValue);
              },
              onError: () => setStartDate(null),
              renderInput: (p) => <TextField {...p} error={!startDate} />,
            }}
            endDateProps={{
              value: endDate,
              onChange: (newValue) => {
                newValue && setEndDate(newValue);
              },
              onError: () => setEndDate(null),
              renderInput: (p) => <TextField {...p} error={!endDate} />,
            }}
          />
          {isLoading || isFetching ? (
            <LineChartSkeleton />
          ) : (
            data && (
              <Paper>
                <TabContext value={tabValue}>
                  <Toolbar>
                    <TabList onChange={handleTabChange}>
                      <Tab label="DPP Total" value="dpp" />
                      <Tab label="AIC Total" value="aic" />
                    </TabList>
                  </Toolbar>

                  <TabPanel value="dpp">
                    <Stack spacing={3}>
                      <CustomMuiGrid variant="large" disablePaper>
                        <LineChart
                          data={data?.valueList.Kgup}
                          labelPropName={dppConfig.labelPropName}
                          isLoading={isLoading}
                          chartOptions={dppConfig.chartOptions}
                          chartDataOptions={dppConfig.chartDataOptions}
                        />
                      </CustomMuiGrid>
                      <CustomAgGridTable
                        data={data.valueList.Kgup.map((item) => ({
                          ...item,
                          tarih: format(new Date(item.tarih), "Pp"),
                        }))}
                      />
                    </Stack>
                  </TabPanel>
                  <TabPanel value="aic">
                    <Stack spacing={3}>
                      <CustomMuiGrid variant="large" disablePaper>
                        <LineChart
                          data={data?.valueList.Eak}
                          labelPropName={aicConfig.labelPropName}
                          isLoading={isLoading}
                          chartOptions={aicConfig.chartOptions}
                          chartDataOptions={aicConfig.chartDataOptions}
                        />
                      </CustomMuiGrid>
                      <CustomAgGridTable
                        data={data.valueList.Eak.map((item) => ({
                          ...item,
                          tarih: format(new Date(item.tarih), "Pp"),
                        }))}
                      />
                    </Stack>
                  </TabPanel>
                </TabContext>
              </Paper>
            )
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default PowerPlantView;
