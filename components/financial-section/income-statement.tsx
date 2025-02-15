import FinancialRatio from "./financial-ratio";
import { FinancialTableData } from "./types";
import { ColumnDefinitionType, Table } from "../ui/table";

const IncomeStatement = ({
  financialRatio,
  profitLoss,
}: {
  profitLoss: FinancialTableData[];
  financialRatio: FinancialTableData[];
}) => {
  const data: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "P&L Statement",
      key: "P&L Statement",
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
      <Table data={profitLoss} columns={data} />
      {financialRatio.length > 0 && <FinancialRatio data={financialRatio} />}
    </>
  );
};

export default IncomeStatement;
