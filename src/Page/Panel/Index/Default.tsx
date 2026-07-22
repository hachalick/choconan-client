import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FetchApi } from "@/Common/Connection/Api/Seed/fetchApi.Api";

export default function Default() {
  const [stateTotalFactors, setStateTotalFactors] = React.useState<any>(null);
  const [stateAverageFactors, setStateAverageFactors] =
    React.useState<any>(null);
  const [stateTotalItems, setStateTotalItems] = React.useState<any>(null);
  const [stateAverageItems, setStateAverageItems] = React.useState<any>(null);
  const [stateTotalPrice, setStateTotalPrice] = React.useState<any>(null);
  const [stateAveragePrice, setStateAveragePrice] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = sessionStorage.getItem("access_token") || "";

      const data = (
        await FetchApi.Order.ReadOrderMonthlyList({
          AccessToken: access_token,
          Count: 12,
          Space: 0,
        })
      ).reverse();

      setStateTotalFactors({
        series: [
          {
            name: "مجموع فاکتور (تعداد)",
            data: data.map((val) => val.totalFactors),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "مجموع فاکتور (تعداد)",
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

      setStateTotalItems({
        series: [
          {
            name: "مجموع آیتم (تعداد)",
            data: data.map((val) => val.totalItems),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "مجموع آیتم (تعداد)",
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

      setStateTotalPrice({
        series: [
          {
            name: "مجموع فروش (تومان)",
            data: data.map((val) => val.totalPrice),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "مجموع فروش (تومان)",
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

      setStateAverageFactors({
        series: [
          {
            name: "میانگین فاکتور (تعداد)",
            data: data.map((val) => val.averageFactors),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "میانگین فاکتور (تعداد)",
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

      setStateAverageItems({
        series: [
          {
            name: "میانگین آیتم (تعداد)",
            data: data.map((val) => val.averageItems),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "میانگین آیتم (تعداد)",
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

      setStateAveragePrice({
        series: [
          {
            name: "میانگین فروش (تومان)",
            data: data.map((val) => val.averagePrice),
          },
        ],
        options: {
          chart: {
            height: 10,
            type: "line" as const,
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "straight" as const,
          },
          title: {
            text: "میانگین فروش (تومان)",
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

  if (
    stateTotalFactors &&
    stateAverageFactors &&
    stateTotalItems &&
    stateAverageItems &&
    stateTotalPrice &&
    stateAveragePrice
  )
    return (
      <div>
        <ReactApexChart
          options={stateTotalFactors.options}
          series={stateTotalFactors.series}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={stateTotalItems.options}
          series={stateTotalItems.series}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={stateTotalPrice.options}
          series={stateTotalPrice.series}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={stateAverageFactors.options}
          series={stateAverageFactors.series}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={stateAverageItems.options}
          series={stateAverageItems.series}
          type="line"
          height={350}
        />
        <ReactApexChart
          options={stateAveragePrice.options}
          series={stateAveragePrice.series}
          type="line"
          height={350}
        />
      </div>
    );
}
