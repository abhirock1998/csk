import { classNames } from "@/utils/style";
import { ColumnDefinitionType } from "./types";

type TableHeaderProps<T> = {
  columns: Array<ColumnDefinitionType<T>>;
};

function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  const mergeTrClass = classNames(
    "grid gap-4 text-text_color border border-[#0000001f] auto-cols-fr w-full p-4 font-medium  rounded-t-xl",
    !columns.every((column) => Boolean(column.columnClassName ?? ""))
      ? `grid-cols-[2.5fr_1fr_1fr_1fr_1fr]`
      : `grid-cols-4`
  );

  return (
    <thead className="">
      <tr className={mergeTrClass}>
        {columns.map((column, index) => {
          const mergeThClass = classNames(
            column.columnClassName ??
              "text-secondary_text text-base font-normal",
            column.alignment ?? "text-center",
            "text-wrap truncate"
          );
          return (
            <th
              title={column.header}
              key={`headCell-${index}`}
              className={mergeThClass}
            >
              {column.header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
