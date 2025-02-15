import { ColumnDefinitionType, Table } from "../ui/table";
import { FinancialTableData } from "./types";

const CashFlow = ({ data }: { data: FinancialTableData[] }) => {
  const tableColumn1: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Cash-Flow Statement",
      key: "Cash-Flow Statement",
      alignment: "text-left",
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

  return <Table data={data} columns={tableColumn1} />;
};

export default CashFlow;
