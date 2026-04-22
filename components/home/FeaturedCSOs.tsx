import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CSOCard from '@/components/cso/CSOCard';
import { mockCSOs } from '@/lib/mock-data';

export default function FeaturedCSOs() {
  const featured = mockCSOs.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Featured CSOs</h2>
            <p className="text-gray-500">Verified organisations making measurable impact</p>
          </div>
          <Link
            href="/csos"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-pamoja-green-600 hover:text-pamoja-green-700"
          >
            Browse All CSOs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((cso) => (
            <CSOCard key={cso.id} cso={cso} />
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/csos"
            className="inline-flex items-center gap-1 text-sm font-medium text-pamoja-green-600"
          >
            Browse All CSOs <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
