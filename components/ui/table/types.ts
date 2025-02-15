import { JSX } from "react";

export type ColumnDefinitionType<T> = {
  key: string;
  header: string;
  width?: number;
  alignment?: "text-center" | "text-left" | "text-end";
  render?(t: T, index?: number): JSX.Element;
  columnClassName?: string;
  gridClassName?: string;
};
