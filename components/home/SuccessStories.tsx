import Image from 'next/image';
import { Quote } from 'lucide-react';
import { mockTestimonials } from '@/lib/mock-data';

export default function SuccessStories() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h2>
          <p className="text-gray-500">Real people, real impact, real change</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <Quote className="w-8 h-8 text-pamoja-green-200 mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.quote}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-pamoja-green-50 text-pamoja-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    {t.impactStat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
