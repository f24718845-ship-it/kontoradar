import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: 'https://kontoradar.pages.dev/',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://kontoradar.pages.dev${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Nawigacja okruszkowa" className="py-3 px-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Start</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 font-semibold truncate max-w-[240px]">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
