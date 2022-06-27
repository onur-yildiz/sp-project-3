import { ChartConfig, LineControllerChartOptions } from "chart.js";
import {
  addTooltipLabelSuffix,
  defaultDateLabelCallback,
} from "../../utils/chart";

const dateIntervalEicConfig = (): ChartConfig<
  "line",
  LineControllerChartOptions
> => ({
  chartOptions: {
    scales: {
      y: {
        stacked: true,
        min: 0,
      },
    },
    plugins: {
      title: {
        display: true,
      },
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: defaultDateLabelCallback,
          label: (tooltipItem: any) => {
            return addTooltipLabelSuffix(tooltipItem, "MWh");
          },
          afterBody: (tooltipItem: any[]) => {
            const total: number = tooltipItem.reduce(
              (prev: number, curr: any) => {
                return prev + curr.dataset.data[curr.dataIndex];
              },
              0
            );
            return `Total: ${total.toLocaleString()} MWh`;
          },
        },
      },
    },
  },
  chartDataOptions: {
    fill: true,
  },
  labelPropName: "tarih",
});

export default dateIntervalEicConfig;
