import { useRef, useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ answer, question }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[#eaecf0]">
      <div
        onClick={() => setIsOpen((pre) => !pre)}
        className="cursor-pointer justify-between items-center py-6 flex"
      >
        <div className="tracking-normal mt-0 mb-0 text-[1.125rem] font-medium leading-[1.5rem] text-text_color">
          {question}
        </div>

        <div className="relative min-h-6 min-w-6  border-2 border-[#98a2b3] rounded-full flex items-center justify-center">
          <div className="bg-[#98a2b3] rounded-[1px] w-3 h-[2px]" />
          <div
            className={`bg-[#98a2b3] rounded-[1px] w-[2px] h-3 transform absolute transition-transform duration-300`}
            style={{
              transform: isOpen ? "rotate(90deg)" : "rotate(0deg) ",
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
      <div
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="text-secondary_text tracking-normal text-base font-normal leading-6">
          {answer}
        </div>
        <div className="min-h-8" />
      </div>
    </div>
  );
};

export default Accordion;
