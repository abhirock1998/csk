"use client";

import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

import { classNames } from "@/utils/style";
import { ChartTimeFrame } from "@/constants/sheet";
import { useStockStore } from "@/store/stock";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const validTimeFrame: ChartTimeFrame[] = ["weekly", "monthly", "daily"];

const LineChart = () => {
  const { setPrice } = useStockStore();
  const [isLoading, setIsLoading] = useState(true);
  const [charData, setChartData] = useState<any>(null);
  const [timeFrame, setTimeFrame] = useState<ChartTimeFrame>("monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `/api/analytics?time_frame=${timeFrame}`
        );
        const summary = data?.summary ?? {};
        const currentPrice = summary?.currentPrice || 0;
        setChartData(data);
        console.log(`Setting price: ${currentPrice}`);
        setPrice(currentPrice);
      } catch (error) {
        console.log(`Error: ${error}`);
        setChartData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeFrame]);

  const lineData: any[] = charData?.data ?? [];

  const summary = charData?.summary ?? {};

  const currentPrice = summary?.currentPrice || 0;
  const deltaPercentage = summary?.changePercent || 0;
  const deltaValue = summary?.change || 0;

  const handleTimeFrameChange = async (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = evt.target;
    setTimeFrame(value as ChartTimeFrame);
  };

  return (
    <>
      <CSKLogo />
      <Title />
      <div className="flex justify-between items-center max-md:flex-col gap-4">
        <StockSummary
          currentPrice={currentPrice}
          deltaPercentage={deltaPercentage}
          deltaValue={deltaValue}
        />
        <select
          onChange={handleTimeFrameChange}
          value={timeFrame}
          className="bg-gray-200 p-2 rounded-md max-w-[200px] w-full capitalize"
        >
          <option value="" disabled>
            Select Time Frame
          </option>
          {validTimeFrame.map((timeFrame) => (
            <option className="capitalize" key={timeFrame} value={timeFrame}>
              {timeFrame}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <FetchingData />
      ) : lineData.length > 0 ? (
        <Chart
          options={getChartOptions(lineData)}
          series={getChartSeries(lineData)}
          type="line"
          height={400}
        />
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default LineChart;

const getChartSeries = (data: any[]): any[] => {
  return [
    {
      name: "Stock Price",
      data: data.map((item) => item?.Price ?? 0),
    },
  ];
};

const getChartOptions = (data: any[]): ApexOptions => {
  return {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        allowMouseWheelZoom: false,
        enabled: false,
      },
    },
    xaxis: {
      categories: data.map((item) => item?.Date),
    },
    yaxis: {
      labels: {
        formatter: (value) => `₹ ${value}`,
      },
    },
    tooltip: {
      y: {
        formatter(val, opts) {
          return `₹ ${val}`;
        },
      },
      marker: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: ["#00FF00"],
    },
    markers: {
      size: 4,
      colors: ["#00FF00"],
    },
    legend: {
      position: "top",
      labels: {
        colors: "#000",
      },
    },
  };
};

// ########################  Component ########################
const CSKLogo = () => {
  return (
    <div className="w-28 h-28 max-sm:w-14 max-sm:h-14 mb-0">
      <Image
        src="https://cdn.prod.website-files.com/66dad9c594a45d74898a5fc6/66e9a5d287ad4d164a1788ae_70521baac89be4d4cb2f223bbf67c974%20(1).avif"
        alt="Chennai Super King (CSK)"
        width={100}
        height={100}
        className="rounded-md w-full h-full"
      />
    </div>
  );
};

const Title = () => {
  return (
    <h2 className="text-[#181818] text-left tracking-[-0.5px] w-auto mt-0 mb-0  font-[Inter] text-2xl max-sm:text-[1rem] font-medium leading-8">
      Chennai Super Kings (CSK) Share Price
    </h2>
  );
};

const FetchingData = () => {
  return (
    <div className="text-secondary_text flex m-4 text-center justify-center items-center">
      Getting latest share price data...
    </div>
  );
};

interface StockSummaryProps {
  currentPrice: number;
  deltaValue: number;
  deltaPercentage: number;
}

const StockSummary = ({
  currentPrice,
  deltaPercentage,
  deltaValue,
}: StockSummaryProps) => {
  const deltaValueClass = classNames(
    "font-medium",
    deltaValue < 0 ? "text-[#980003]" : "text-brand_color"
  );

  const deltaPerClass = classNames(
    "font-medium",
    deltaPercentage < 0 ? "text-[#980003]" : "text-brand_color"
  );
  return (
    <div className="flex gap-4 text-text_color items-start text-xl font-semibold leading-7">
      <div className="text-text_color mt-0 mb-0 text-2xl font-semibold leading-7">
        ₹ {currentPrice}
      </div>
      <div className={deltaValueClass}>{Number(deltaValue).toFixed(2)}</div>
      <div className={deltaPerClass}>{Number(deltaPercentage).toFixed(2)}%</div>
      {/* <div className="text-secondary_text">4M</div> */}
    </div>
  );
};

const NoDataFound = () => {
  return (
    <div className="text-secondary_text flex m-4 text-center justify-center items-center">
      No Record Found
    </div>
  );
};
