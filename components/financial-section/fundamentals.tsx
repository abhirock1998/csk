import { useStockStore } from "@/store/stock";
import Loading from "./loading";

interface FundamentalData {
  Fundamental: string;
  Value?: string;
}

const FundamentalSection = ({
  data,
  isLoading = false,
}: {
  data: FundamentalData[];
  isLoading?: boolean;
}) => {
  const midIndex = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, midIndex);
  const secondHalf = data.slice(midIndex, data.length);
  const { price } = useStockStore();

  if (isLoading || data.length === 0) {
    return (
      <section className="lg:px-[10%] px-[5%] mt-8">
        <h3 className="text-text_color mt-0 mb-4 text-[1.2rem] font-semibold leading-[1.8rem]">
          Fundamentals
        </h3>
        {isLoading ? (
          <Loading title="Fetching Fundamentals Data..." />
        ) : (
          <div className="grid gap-4 grid-rows-auto lg:grid-cols-[1fr_0.5fr] grid-cols-1 place-items-start-stretch max-h-none">
            <p className="text-secondary_text flex m-0 text-center justify-center items-center">
              No Record Found
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="lg:px-[10%] px-[5%] mt-8">
      <h3 className="text-text_color mt-0 mb-4 text-[1.2rem] font-semibold leading-[1.8rem]">
        Fundamentals
      </h3>

      <div className="grid gap-4 grid-rows-auto lg:grid-cols-[1fr_0.5fr] grid-cols-1 place-items-start-stretch max-h-none">
        <div className="grid gap-8 grid-rows-auto grid-cols-[auto_auto] mt-0  max-sm:grid-cols-1">
          <div className="flex flex-col gap-8">
            <FundamentalInfoRow>
              <FundamentalKey title="Chennai Super Kings (CSK) Shares" />
              <FundamentalValue title={price.toString() || "-"} />
            </FundamentalInfoRow>
            {firstHalf.map((item, index) => {
              return (
                <FundamentalInfoRow key={`first-half-${index}`}>
                  <FundamentalKey title={item.Fundamental} />
                  <FundamentalValue title={item.Value ?? "-"} />
                </FundamentalInfoRow>
              );
            })}
          </div>
          <div className="flex flex-col gap-8">
            {secondHalf.map((item, index) => {
              return (
                <FundamentalInfoRow key={`second-half-${index}`}>
                  <FundamentalKey title={item.Fundamental} />
                  <FundamentalValue title={item.Value ?? "-"} />
                </FundamentalInfoRow>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundamentalSection;

interface FundamentalCellProps {
  title: string;
}

const FundamentalKey = ({ title }: FundamentalCellProps) => {
  return (
    <div className="text-text_color mt-0 mb-0 text-[1rem] font-medium">
      {title}
    </div>
  );
};

const FundamentalValue = ({ title }: FundamentalCellProps) => {
  return (
    <div
      title={title}
      className="text-text_color w-full text-[1rem] font-medium truncate"
    >
      {title}
    </div>
  );
};

const FundamentalInfoRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-4 grid-rows-auto grid-cols-2 auto-cols-fr">
      {children}
    </div>
  );
};
