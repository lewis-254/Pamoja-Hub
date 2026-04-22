import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CauseCategory } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKES(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function clampPercent(raised: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((raised / target) * 100), 100);
}

export const CATEGORY_COLORS: Record<CauseCategory, string> = {
  Health: 'bg-red-100 text-red-700',
  Education: 'bg-blue-100 text-blue-700',
  Environment: 'bg-pamoja-green-100 text-pamoja-green-700',
  'Human Rights': 'bg-purple-100 text-purple-700',
  'E-Government': 'bg-sky-100 text-sky-700',
  'Women Empowerment': 'bg-pink-100 text-pink-700',
  Youth: 'bg-amber-100 text-amber-700',
};
