"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Hur lång tid tar ett introduktionssamtal?",
    answer: "Ett introduktionssamtal tar cirka 30 minuter. Vi diskuterar era mål, behov och utmaningar för att se om Southbase är rätt för er.",
  },
  {
    question: "Vad händer efter introduktionssamtalet?",
    answer: "Efter samtalet får ni en tydlig bild av hur vi kan hjälpa er. Om vi inte är rätt match pekar vi er i rätt riktning. Om vi är rätt match går vi vidare med en mer detaljerad diskussion om upplägg och nästa steg.",
  },
  {
    question: "Behöver jag förbereda något inför samtalet?",
    answer: "Nej, inget särskilt. Det är bra om ni har en uppfattning om era försäljningsutmaningar och mål, men vi guidar er genom samtalet.",
  },
  {
    question: "Vad kostar ett introduktionssamtal?",
    answer: "Introduktionssamtalet är kostnadsfritt och utan förpliktelser. Det är en möjlighet för oss att lära känna varandra och se om vi är rätt match.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`border rounded-xl bg-white overflow-hidden transition-all duration-500 ease-out ${
              openIndex === index
                ? "border-neutral-300/80 shadow-sm"
                : "border-neutral-200/50 hover:border-neutral-300/60"
            }`}
            style={{
              transform: openIndex === index ? "translateY(0)" : "translateY(0)",
            }}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-all duration-300 ${
                openIndex === index
                  ? "bg-neutral-50/30"
                  : "hover:bg-neutral-50/40"
              }`}
              aria-expanded={openIndex === index}
            >
              <span
                className={`font-medium text-base pr-8 transition-colors duration-300 ${
                  openIndex === index ? "text-neutral-900" : "text-neutral-800"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`flex-shrink-0 transition-all duration-500 ease-out ${
                  openIndex === index
                    ? "rotate-180 text-neutral-600"
                    : "rotate-0 text-neutral-400"
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div
                className={`px-6 pb-5 pt-0 transition-all duration-500 ${
                  openIndex === index ? "translate-y-0" : "-translate-y-2"
                }`}
              >
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

