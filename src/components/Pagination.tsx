/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CornerDownLeft } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  t: TranslationSchema;
  currentLang: Language;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  t,
  currentLang
}) => {
  const [jumpInput, setJumpInput] = useState('');

  if (totalPages <= 1) return null;

  // Calculate items range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate pagination page numbers window
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        pages.push(i);
      }
    }

    const withEllipsis: (number | string)[] = [];
    for (const p of pages) {
      if (l) {
        if ((p as number) - l === 2) {
          withEllipsis.push(l + 1);
        } else if ((p as number) - l !== 1) {
          withEllipsis.push('...');
        }
      }
      withEllipsis.push(p);
      l = p as number;
    }

    return withEllipsis;
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpInput('');
    }
  };

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f1128]/80 border border-amber-500/20 backdrop-blur-xl shadow-xl">
      
      {/* Range Status Info */}
      <div className="text-xs sm:text-sm text-slate-300">
        {t.showingResults}{' '}
        <span className="font-bold text-amber-300">{startItem}</span> -{' '}
        <span className="font-bold text-amber-300">{endItem}</span> {t.of}{' '}
        <span className="font-bold text-emerald-400">{totalItems}</span>
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
        {/* First Page */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-900 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title={t.firstPage}
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-900 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title={t.prevPage}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Number Buttons */}
        {getPageNumbers().map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 text-slate-500 text-sm select-none">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`min-w-9 h-9 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-indigo-950/70 border border-indigo-900/80 text-slate-300 hover:text-amber-300 hover:border-amber-400/40'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-900 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title={t.nextPage}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl bg-indigo-950/70 border border-indigo-900 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title={t.lastPage}
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>

      {/* Per Page & Quick Jump */}
      <div className="flex items-center gap-3">
        {/* Items Per Page */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>{t.perPage}:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="px-2 py-1.5 rounded-lg bg-indigo-950/90 border border-indigo-800 text-amber-300 text-xs font-semibold focus:outline-none focus:border-amber-400"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Quick Page Jump Form */}
        <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
          <input
            type="number"
            min={1}
            max={totalPages}
            placeholder={`${currentPage}`}
            value={jumpInput}
            onChange={(e) => setJumpInput(e.target.value)}
            className="w-14 px-2 py-1.5 rounded-lg bg-indigo-950/90 border border-indigo-800 text-center text-xs text-white focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/40 transition-colors"
            title="Go"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </nav>
  );
};
