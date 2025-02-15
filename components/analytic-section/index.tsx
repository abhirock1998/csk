import StockChart from "./chart";
import BuySellForm from "./interest-form";

const AnalyticSection = () => {
  return (
    <section className="lg:mx-[10%] lg:mt-[5%] mt-[2.5%] mx-[5%] ">
      <div className="flex lg:flex-row gap-[4rem] flex-wrap items-stretch max-h-none flex-col">
        <div className="flex-1 flex flex-col gap-4 w-full h-full items-stretch">
          <StockChart />
        </div>
        <div className="flex-[0.5]">
          <BuySellForm />
        </div>
      </div>
    </section>
  );
};

export default AnalyticSection;
