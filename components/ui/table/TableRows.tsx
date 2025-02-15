import React from "react";
import { classNames } from "@/utils/style";

import { ColumnDefinitionType } from "./types";

type TableRowsProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T>>;
  rowClassName?(t: T): string;
};

function TableRows<T>({ data, columns }: TableRowsProps<T>) {
  return (
    <tbody className=" border-[#0000001f]">
      {data.map((row, index) => {
        const mergeClass = classNames(
          "grid gap-4 text-text_color border-b border-l border-r border-[#0000001a] auto-cols-fr w-full p-4 font-medium",
          !columns.every((column) => Boolean(column.columnClassName ?? ""))
            ? `grid-cols-[2.5fr_1fr_1fr_1fr_1fr]`
            : `grid-cols-4`,
          data.length - 1 === index && "rounded-b-lg"
        );
        return (
          <tr className={mergeClass} key={`row-${index}`}>
            {columns.map((column, index2) => (
              <td
                key={`cell-${index2}`}
                className={`font-medium ${column.alignment ?? "text-center"}`}
              >
                {column.render && column.render(row, index + 1)}
                {!column.render && ((row as any)[column.key] || "-")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableRows;
