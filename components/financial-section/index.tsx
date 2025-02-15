"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import Loading from "./loading";
import TabBar from "../ui/tab/tab";
import CashFlow from "./cash-flow";
import BalanceSheet from "./balance-sheet";
import ManagementPattern from "./management";
import ShareholderPattern from "./shareholder";
import IncomeStatement from "./income-statement";
import FundamentalSection from "./fundamentals";

type FinanceTab = "INCOME_STATEMENT" | "CASH_FLOW" | "BALANCE_SHEET";

type FinancialResponse = {
  "P&L Statement": any[];
  "Financial Ratios": any[];
  Assets: any[];
  Liabilities: any[];
  "Cash Flow Statement": any[];
  "Shareholding Pattern": any[];
  Management: any[];
  "Stock Price": any[];
  Fundamentals: any[];
};

const FinancialSection = () => {
  const [activeTabId, setActiveTabId] =
    useState<FinanceTab>("INCOME_STATEMENT");
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<FinancialResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api");
        setApiData(data);
      } catch (error) {
        console.log(`Error: ${error}`);
        setApiData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <FundamentalSection isLoading data={[]} />
        <section className="lg:px-[10%] px-[5%] pb-[10%] mt-8">
          <div className="text-text_color mt-0 text-[1.2rem] font-semibold leading-[1.8rem] mb-3">
            Financial{" "}
            <span className="text-secondary_text font-normal">(In Cr)</span>
          </div>
          <div className="grid lg:grid-cols-[1fr_0.5fr] grid-cols-1 grid-rows-auto gap-4 place-items-start-stretch max-h-none">
            <Loading />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <FundamentalSection data={apiData?.Fundamentals ?? []} />
      <section className="lg:px-[10%] px-[5%] pb-[10%] mt-8">
        <div className="text-text_color mt-0 text-[1.2rem] font-semibold leading-[1.8rem] mb-3">
          Financial{" "}
          <span className="text-secondary_text font-normal">(In Cr)</span>
        </div>
        <div className="grid lg:grid-cols-[1fr_0.5fr] grid-cols-1 grid-rows-auto gap-4 place-items-start-stretch max-h-none">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex">
              <TabBar<FinanceTab>
                className="flex-1 text-center"
                activeTabId={activeTabId}
                id="INCOME_STATEMENT"
                onClick={setActiveTabId}
                title="Income statement"
              />
              <TabBar<FinanceTab>
                activeTabId={activeTabId}
                id="BALANCE_SHEET"
                className="flex-1 text-center"
                onClick={setActiveTabId}
                title="Balance sheet"
              />
              <TabBar<FinanceTab>
                activeTabId={activeTabId}
                id="CASH_FLOW"
                className="flex-1 text-center"
                onClick={setActiveTabId}
                title="Cash flow"
              />
            </div>

            {activeTabId === "BALANCE_SHEET" ? (
              <BalanceSheet
                assets={apiData?.Assets ?? []}
                liabilities={apiData?.Liabilities ?? []}
              />
            ) : activeTabId === "CASH_FLOW" ? (
              <CashFlow data={apiData?.["Cash Flow Statement"] ?? []} />
            ) : (
              <IncomeStatement
                financialRatio={apiData?.["Financial Ratios"] ?? []}
                profitLoss={apiData?.["P&L Statement"] ?? []}
              />
            )}

            <ShareholderPattern
              data={apiData?.["Shareholding Pattern"] ?? []}
            />
            <ManagementPattern data={apiData?.Management ?? []} />
          </div>
        </div>
      </section>
    </>
  );
};

export default FinancialSection;
