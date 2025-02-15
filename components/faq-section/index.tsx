"use client";

import faqData from "@/constants/faq";
import Accordion from "../ui/accordion";

const FaqSection = () => {
  return (
    <div className="lg:px-[10%] px-[5%]">
      <div className="max-w-[48rem] mx-auto">
        <h2 className="tracking-[-0.2px] text-[2.1rem] font-semibold leading-[2.5rem] mb-[4rem] text-center">
          FAQ's
        </h2>
      </div>

      <div className="max-w-[48rem] mx-auto">
        {faqData.map((faq) => {
          return (
            <Accordion
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
