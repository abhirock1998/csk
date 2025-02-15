import { ChartTimeFrame } from "@/constants/sheet";
import {
  parseISO,
  format,
  startOfWeek,
  startOfMonth,
  compareAsc,
  getWeek,
  isValid,
} from "date-fns";

const getGroupKey = (row: any, timeFrame: ChartTimeFrame): string => {
  const date = parseISO(row.Date);
  if (timeFrame === "weekly") {
    return format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
  } else if (timeFrame === "monthly") {
    return format(startOfMonth(date), "yyyy-MM-dd");
  }
  return row.Date;
};

const getXAxisLabel = (date: string, timeFrame: ChartTimeFrame) => {
  if (!isValid(parseISO(date))) return "Invalid Date";
  if (timeFrame === "daily") {
    return format(parseISO(date), "MMM dd");
  } else if (timeFrame === "weekly") {
    const weekNumber = getWeek(parseISO(date));
    return `Week ${weekNumber}`;
  } else {
    return format(parseISO(date), "MMM");
  }
};

export const groupRowsByTimeFrame = (
  rows: any[],
  timeFrame: ChartTimeFrame
) => {
  const groups = new Map<string, any[]>();

  for (const row of rows) {
    const key = getGroupKey(row, timeFrame);
    if (groups.has(key)) {
      groups.get(key)!.push(row);
    } else {
      groups.set(key, [row]);
    }
  }

  let sortedKeys = Array.from(groups.keys()).sort((a, b) => {
    const dateA = parseISO(a);
    const dateB = parseISO(b);
    return compareAsc(dateA, dateB);
  });

  // Clamp to only the latest 52 groups
  const isWeekly = timeFrame === "weekly";
  const isMonthly = timeFrame === "monthly";
  const isDaily = timeFrame === "daily";
  if (isWeekly && sortedKeys.length > 52) {
    sortedKeys = sortedKeys.slice(-52);
  }

  if (isMonthly && sortedKeys.length > 12) {
    sortedKeys = sortedKeys.slice(-12);
  }

  if (isDaily && sortedKeys.length > 30) {
    sortedKeys = sortedKeys.slice(-30);
  }

  const aggregatedData = sortedKeys.map((key) => {
    const group = groups.get(key)!;

    return {
      Date: getXAxisLabel(key, timeFrame),
      Price: group[group.length - 1].Price,
      Low: Math.min(...group.map((d) => d.Low)),
      High: Math.max(...group.map((d) => d.High)),
    };
  });

  let currentPrice = 0;
  let change = 0;
  let changePercent = 0;

  const N = aggregatedData.length;

  if (N > 0) {
    currentPrice = aggregatedData[N - 1].Price;
    if (N > 1) {
      const previousPrice = aggregatedData[N - 2].Price;
      change = currentPrice - previousPrice;
      changePercent = previousPrice !== 0 ? (change / previousPrice) * 100 : 0;
    }
  }

  return {
    data: aggregatedData,
    summary: { currentPrice, change, changePercent },
  };
};
