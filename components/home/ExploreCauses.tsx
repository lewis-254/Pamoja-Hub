'use client';

import { useRouter } from 'next/navigation';
import type { CauseCategory } from '@/lib/types';
import { CATEGORY_COLORS } from '@/lib/utils';

const categories: CauseCategory[] = [
  'Health',
  'Education',
  'Environment',
  'Human Rights',
  'E-Government',
  'Women Empowerment',
  'Youth',
];

export default function ExploreCauses() {
  const router = useRouter();

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore Causes</h2>
        <p className="text-gray-500 mb-8">Browse CSOs by the issues that matter most to you</p>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => router.push(`/csos?category=${encodeURIComponent(cat)}`)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all hover:scale-105 hover:shadow-md cursor-pointer ${CATEGORY_COLORS[cat]}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
