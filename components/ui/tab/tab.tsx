import { classNames } from "@/utils/style";

interface TabBarProps<T> {
  id: T;
  activeTabId: T;
  onClick: (value: T) => void;
  title: string;
  className?: string;

  activeTabClass?: string;
}

const TabBar = <T,>({
  activeTabId,
  id,
  onClick,
  title,
  activeTabClass,
  className,
}: TabBarProps<T>) => {
  const mergeClass = classNames(
    "border-b-2 font-medium text-base cursor-pointer py-[9px] ",
    id === activeTabId
      ? activeTabClass ?? "text-brand_color border-brand_color"
      : "text-secondary_text border-transparent",
    className
  );

  return (
    <div className={mergeClass} onClick={() => onClick(id)}>
      {title}
    </div>
  );
};

export default TabBar;
