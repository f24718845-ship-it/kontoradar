'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  title = 'Najczęściej zadawane pytania (FAQ)',
  subtitle = 'Wszystko, co musisz wiedzieć o wyborze konta, opłatach i promocjach bankowych.',
  items,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section className="my-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-100">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Odpowiedzi ekspertów</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-slate-600 mt-2">{subtitle}</p>}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-base">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
