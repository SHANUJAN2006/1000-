/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-slate-950 font-bold text-sm shadow-2xl shadow-emerald-950/60 border border-emerald-300 animate-slideUp">
      <CheckCircle2 className="w-5 h-5 text-slate-950" />
      <span>{message}</span>
    </div>
  );
};
