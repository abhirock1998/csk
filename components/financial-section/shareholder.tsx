import { ColumnDefinitionType, Table } from "../ui/table";
import { FinancialTableData } from "./types";

const ShareholderPattern = ({ data }: { data: FinancialTableData[] }) => {
  const columnData: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Shareholding Pattern",
      key: "Shareholding Pattern",
      alignment: "text-left",
    },
    {
      header: "2021",
      key: "2021",
    },
    {
      header: "2021",
      key: "2021",
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
      <h3 className="text-text_color my-4 text-[1.2rem] font-semibold leading-[1.8rem]">
        Shareholding Pattern
      </h3>
      <Table data={data} columns={columnData} />
    </>
  );
};

export default ShareholderPattern;
