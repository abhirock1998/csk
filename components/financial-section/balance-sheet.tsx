import { FinancialTableData } from "./types";
import { ColumnDefinitionType, Table } from "../ui/table";

const BalanceSheet = ({
  assets,
  liabilities,
}: {
  assets: FinancialTableData[];
  liabilities: FinancialTableData[];
}) => {
  const tableColumn1: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Assets",
      key: "Assets",
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

  const tableColumn2: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Liabilities",
      key: "Liabilities",
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

  return (
    <>
      <Table data={assets} columns={tableColumn1} />
      {liabilities.length > 0 && (
        <Table data={liabilities} columns={tableColumn2} />
      )}
    </>
  );
};

export default BalanceSheet;
