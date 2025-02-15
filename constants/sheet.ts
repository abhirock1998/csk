export enum SHEET_CONFIG {
  InterestForm = 0,
  IncomeStatement = 1,
  BalanceSheet = 2,
  CashFlow = 3,
  ShareholderPattern = 4,
  Management = 5,
  Fundamental = 6,
  StockPrice = 7,
}

const COMMON_COLUMNS = ["2021", "2022", "2023", "2024"];

export type ValidSheetConfig = Exclude<SHEET_CONFIG, SHEET_CONFIG.InterestForm>;

export const SHEET_REQUIRED_COLUMNS: Record<
  ValidSheetConfig,
  { tableOrder: number; pattern: string[] }[]
> = {
  [SHEET_CONFIG.IncomeStatement]: [
    { tableOrder: 1, pattern: ["P&L Statement", ...COMMON_COLUMNS] },
    { tableOrder: 2, pattern: ["Financial Ratios", ...COMMON_COLUMNS] },
  ],
  [SHEET_CONFIG.BalanceSheet]: [
    { tableOrder: 1, pattern: ["Assets", ...COMMON_COLUMNS] },
    { tableOrder: 2, pattern: ["Liabilities", ...COMMON_COLUMNS] },
  ],
  [SHEET_CONFIG.CashFlow]: [
    {
      tableOrder: 1,
      pattern: ["Cash-Flow Statement", ...COMMON_COLUMNS],
    },
  ],
  [SHEET_CONFIG.ShareholderPattern]: [
    { tableOrder: 1, pattern: ["Shareholding Pattern", ...COMMON_COLUMNS] },
  ],
  [SHEET_CONFIG.Management]: [
    {
      tableOrder: 1,
      pattern: ["Name", "Designation", "Experience", "Linkedin Profile"],
    },
  ],
  [SHEET_CONFIG.Fundamental]: [
    {
      tableOrder: 1,
      pattern: ["Fundamental", "Value"],
    },
  ],
  [SHEET_CONFIG.StockPrice]: [
    {
      tableOrder: 1,
      pattern: ["Date", "Price", "High", "Low"],
    },
  ],
};

export const GOOGLE_SHEET_NAME_MAP = {
  "11": "P&L Statement",
  "12": "Financial Ratios",
  "21": "Assets",
  "22": "Liabilities",
  "31": "Cash Flow Statement",
  "41": "Shareholding Pattern",
  "51": "Management",
  "61": "Fundamentals",
  "71": "Stock Price",
} as const;

export type ChartTimeFrame = "weekly" | "monthly" | "daily";
