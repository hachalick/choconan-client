import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FetchApi } from "@/Common/Connection/Api/SeedWork/fetchApi.Api";

export default function Default() {
  const [state, setState] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      const data = (await FetchApi.Order.fetchReportMonthlyOrder({
        access_token,
      })).reverse();

      setState({
        series: [
          {
            name: "فاکتور",
            data: data.map((val) => val.totalFactors),
          },
          {
            name: "آیتم",
            data: data.map((val) => val.totalItems),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const, // اضافه کردن as const
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const, // این هم نیاز دارد
          },
          title: {
            text: "فروش محصول در این ماه",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.3,
            },
          },
          xaxis: {
            categories: data.map((val) => val.month),
          },
        } as ApexOptions, // تعیین نوع برای کل options
      });
    };
    fetchData();
  }, []);

  if (state != null)
    return (
      <div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
    );
}
