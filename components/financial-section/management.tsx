import Link from "next/link";
import Image from "next/image";
import { FinancialTableData } from "./types";
import { ColumnDefinitionType, Table } from "../ui/table";

const ManagementPattern = ({ data }: { data: FinancialTableData[] }) => {
  const columnData: ColumnDefinitionType<FinancialTableData>[] = [
    {
      header: "Name",
      key: "Name",
      alignment: "text-left",
      columnClassName: "text_text-color font-medium text-base",
    },
    {
      header: "Designation",
      key: "Designation",
      columnClassName: "text_text-color font-medium text-base",
    },
    {
      header: "Experience",
      key: "Experience",
      columnClassName: "text_text-color font-medium text-base",
    },
    {
      header: "Linkedin Profile",
      key: "Linkedin Profile",
      columnClassName: "text_text-color font-medium text-base",
      render(t, index) {
        return (
          <Link
            href={(t?.["Linkedin Profile"] || window.location.href) as string}
            className="flex justify-center items-center"
          >
            <Image
              src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/66db4271e6eed217b0c84cd3_linkedin-original.png.svg"
              alt="linkedin icon"
              objectFit="contain"
              width={30}
              height={30}
            />
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <h3 className="text-text_color my-4 text-[1.2rem] font-semibold leading-[1.8rem]">
        Promoters or Management
      </h3>
      <Table data={data} columns={columnData} />
    </>
  );
};

export default ManagementPattern;
