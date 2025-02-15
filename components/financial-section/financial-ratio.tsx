import { ColumnDefinitionType, Table } from "../ui/table";
import { FinancialTableData } from "./types";

const FinancialRatio = ({ data }: { data: FinancialTableData[] }) => {
  const columnData: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Financial Ratios",
      key: "Financial Ratios",
      alignment: "text-left",
      columnClassName: "text_text-color font-medium text-base",
    },
    {
      header: "2021",
      key: "2021",
    },
    {
      header: "2022",
      key: "2022",
    },
    {
      header: "2023",
      key: "2023",
    },
    {
      header: "2024",
      key: "2024",
    },
  ];

  return <Table data={data} columns={columnData} />;
};

export default FinancialRatio;
