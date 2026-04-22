'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CSOCard from '@/components/cso/CSOCard';
import { mockCSOs } from '@/lib/mock-data';
import { CATEGORY_COLORS } from '@/lib/utils';
import type { CauseCategory } from '@/lib/types';

const COUNTIES = ['All Counties', 'Nairobi', 'Kisumu', 'Mombasa', 'Uasin Gishu', 'Nakuru'];
const CATEGORIES: CauseCategory[] = [
  'Health', 'Education', 'Environment', 'Human Rights',
  'E-Government', 'Women Empowerment', 'Youth',
];

function BrowseCSOsContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [selectedCategories, setSelectedCategories] = useState<CauseCategory[]>(
    params.get('category') ? [params.get('category') as CauseCategory] : [],
  );
  const [county, setCounty] = useState('All Counties');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  function toggleCategory(cat: CauseCategory) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  const filtered = useMemo(() => {
    return mockCSOs.filter((cso) => {
      const matchesQuery =
        !query ||
        cso.name.toLowerCase().includes(query.toLowerCase()) ||
        cso.location.toLowerCase().includes(query.toLowerCase()) ||
        cso.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory =
        selectedCategories.length === 0 ||
        cso.categories.some((c) => selectedCategories.includes(c));

      const matchesCounty = county === 'All Counties' || cso.county === county;
      const matchesVerified = !verifiedOnly || cso.verified;

      return matchesQuery && matchesCategory && matchesCounty && matchesVerified;
    });
  }, [query, selectedCategories, county, verifiedOnly]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Browse CSOs</h1>
          <div className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, cause, or location..."
                className="pl-10"
              />
            </div>
            <Button className="bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-sm text-gray-700">Filters</span>
              </div>

              {/* Category multi-select */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                        selectedCategories.includes(cat)
                          ? CATEGORY_COLORS[cat] + ' ring-2 ring-offset-1 ring-current'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* County */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">County</p>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-pamoja-green-300 focus:outline-none"
                >
                  {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Verified only */}
              <div className="flex items-center gap-3">
                <button
                  role="switch"
                  aria-checked={verifiedOnly}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    verifiedOnly ? 'bg-pamoja-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      verifiedOnly ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <BadgeCheck className="w-4 h-4 text-pamoja-green-500" />
                  Verified only
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              {filtered.length} organisation{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="font-semibold text-gray-700 mb-2">No results found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setQuery('');
                    setSelectedCategories([]);
                    setCounty('All Counties');
                    setVerifiedOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((cso) => (
                  <CSOCard key={cso.id} cso={cso} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowseCSOsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <BrowseCSOsContent />
    </Suspense>
  );
}
