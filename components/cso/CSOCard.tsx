import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CATEGORY_COLORS } from '@/lib/utils';
import type { CSO } from '@/lib/types';

interface CSOCardProps {
  cso: CSO;
}

export default function CSOCard({ cso }: CSOCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Cover image */}
      <div className="relative h-48 w-full">
        <Image
          src={cso.coverImage}
          alt={`${cso.name} cover`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {cso.verified && (
          <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
            <BadgeCheck className="w-5 h-5 text-pamoja-green-500" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={cso.logo}
              alt={`${cso.name} logo`}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">{cso.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>{cso.location}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {cso.categories.map((cat) => (
            <span
              key={cat}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[cat]}`}
            >
              {cat}
            </span>
          ))}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-2 mb-4">
          {cso.tagline}
        </p>

        <Link href={`/csos/${cso.slug}`}>
          <Button
            size="sm"
            className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white"
          >
            Donate / Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
