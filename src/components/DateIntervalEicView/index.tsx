import DateIntervalEicForm, {
  DateIntervalEicFormProps,
} from "../DateIntervalEicForm";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import CustomAgGridTable from "../CustomAgGridTable";
import CustomMuiGrid from "../CustomMuiGrid";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import LineChart from "../charts/LineChart";
import { QueryDefinition } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import Stack from "@mui/material/Stack";
import dateIntervalEicConfig from "../../config/charts/date-interval-eic-config";
import { format } from "date-fns";

interface DateIntervalEicChartViewProps {
  title: string;
  params: DateIntervalEicParams;
  isLoading: boolean;
  fetcher: LazyQueryTrigger<
    QueryDefinition<DateIntervalEicParams, any, any, CapacityValues[], any>
  >;
  formProps: DateIntervalEicFormProps;
}

const DateIntervalEicView = (props: DateIntervalEicChartViewProps) => {
  const config = dateIntervalEicConfig();
  const { params, fetcher, isLoading, formProps } = props;
  const [data, setData] = useState<CapacityValues[] | undefined>();

  useEffect(() => {
    const { startDate, endDate, uevcbEIC } = params;
    if (!startDate || !endDate || !uevcbEIC) return;

    const fetchData = async () => {
      try {
        const newData = await fetcher(
          {
            startDate,
            endDate,
            uevcbEIC,
          },
          true
        ).unwrap();

        setData(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [fetcher, params]);

  const chartTitle = config.chartOptions.plugins?.title;
  if (chartTitle) {
    chartTitle.text = props.title;
  }
  config.chartDataOptions.valuePropNames =
    data && data.length > 0
      ? Object.getOwnPropertyNames(data[0]).filter(
          (n) => !["tarih", "toplam"].includes(n)
        )
      : undefined;
  return (
    <Stack spacing={3}>
      <Container>
        <Stack spacing={3}>
          <DateIntervalEicForm {...formProps} />
          {(data || isLoading) && (
            <CustomMuiGrid variant="large">
              <LineChart
                data={data}
                labelPropName={config.labelPropName}
                isLoading={isLoading}
                chartOptions={config.chartOptions}
                chartDataOptions={config.chartDataOptions}
              />
            </CustomMuiGrid>
          )}
        </Stack>
      </Container>
      {data && !isLoading && (
        <CustomAgGridTable
          data={data.map((item) => ({
            ...item,
            tarih: format(new Date(item.tarih), "Pp"),
          }))}
        />
      )}
    </Stack>
  );
};

export default DateIntervalEicView;
