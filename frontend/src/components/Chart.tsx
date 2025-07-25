"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { EmissionResult } from "@/types/emissions";

type Props = {
  data: EmissionResult[];
};

export default function EmissionsChart({ data }: Props) {
  const chartOptions: Highcharts.Options = {
    xAxis: {
      categories: data.map((d) => d.quarter),
    },
    tooltip: { shared: true },
    legend: { enabled: true },
    series: [
      {
        type: "line",
        name: "Actual",
        data: data.map((d) => d.actual),
      },
      {
        type: "line",
        name: "Baseline Min",
        data: data.map((d) => Number(d.baseline.min)),
      },
      {
        type: "line",
        name: "Deviation Percent",
        data: data.map((d) => Number(d.deviationPercent)),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
