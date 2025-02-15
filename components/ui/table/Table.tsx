import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

import { ColumnDefinitionType } from "./types";

type TableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
  rowClassName?(t: T): string;
};

export function Table<T>({ data, columns }: TableProps<T>) {
  if (!data || data.length === 0)
    return (
      <div className="text-secondary_text flex m-4 text-center justify-center items-center">
        No Record Found
      </div>
    );

  return (
    <table className="w-full">
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
}
