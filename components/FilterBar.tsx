'use client';

import React from 'react';
import { 
  Filter, 
  Sparkles, 
  Gift, 
  GraduationCap, 
  Smartphone, 
  CreditCard, 
  CheckCircle,
  SlidersHorizontal,
  Flame,
  ArrowUpDown
} from 'lucide-react';
import { trackFilterUsed } from '@/lib/analytics';

export type FilterKey =
  | 'all'
  | 'free'
  | 'bonus'
  | 'young'
  | 'no_fee'
  | 'blik'
  | 'apple_pay'
  | 'google_pay'
  | 'online_opening';

export type SortKey = 'rating' | 'bonus' | 'costs';

interface FilterBarProps {
  activeFilter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
  activeSort: SortKey;
  onSortChange: (sort: SortKey) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  totalCount,
}) => {
  const filterButtons: { key: FilterKey; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'Wszystkie konta', icon: <Flame className="w-4 h-4" /> },
    { key: 'free', label: 'Darmowe konto (0 zł)', icon: <CheckCircle className="w-4 h-4" /> },
    { key: 'bonus', label: 'Z bonusem / premią', icon: <Gift className="w-4 h-4" /> },
    { key: 'young', label: 'Dla młodych (<26 lat)', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'no_fee', label: 'Bez opłaty za prowadzenie', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'blik', label: 'BLIK', icon: <Smartphone className="w-4 h-4" /> },
    { key: 'apple_pay', label: 'Apple Pay', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'google_pay', label: 'Google Pay', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'online_opening', label: 'Założenie online', icon: <Smartphone className="w-4 h-4" /> },
  ];

  const handleSelectFilter = (key: FilterKey) => {
    onFilterChange(key);
    trackFilterUsed('category', key, totalCount);
  };

  const handleSelectSort = (sort: SortKey) => {
    onSortChange(sort);
    trackFilterUsed('sort_order', sort, totalCount);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            <span>Znajdź najlepsze konto</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Wybierz kryteria, które są dla Ciebie najważniejsze. Prezentujemy {totalCount} sprawdzonych ofert.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs w-full md:w-auto justify-between md:justify-end">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sortuj:
          </span>
          <select
            value={activeSort}
            onChange={(e) => handleSelectSort(e.target.value as SortKey)}
            className="bg-slate-50 border border-slate-200 text-slate-800 font-semibold rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="rating">Najwyższa ocena punktowa</option>
            <option value="bonus">Najwyższy bonus finansowy</option>
            <option value="costs">Najniższe koszty stałe</option>
          </select>
        </div>
      </div>

      {/* Filter buttons grid/scroll */}
      <div className="pt-4 flex flex-wrap gap-2">
        {filterButtons.map((btn) => {
          const isActive = activeFilter === btn.key;
          return (
            <button
              key={btn.key}
              type="button"
              onClick={() => handleSelectFilter(btn.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
