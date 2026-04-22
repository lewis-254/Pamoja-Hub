'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/csos?q=${encodeURIComponent(query)}`);
  }

  return (
    <section
      className="relative min-h-[580px] flex items-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://images.unsplash.com/photo-1531206715517-5c0ba140b2b7?w=1600&h=700&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Support Causes That Matter.{' '}
            <span className="text-pamoja-green-400">Connect with CSOs</span> Making a
            Difference in Your Community.
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Find, donate to, and collaborate with verified Civil Society Organizations
            driving change across Kenya.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Cause, Location, or Subject..."
                className="pl-10 h-12 bg-white text-gray-900"
              />
            </div>
            <Button type="submit" className="h-12 px-6 bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
              Search
            </Button>
          </form>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white"
              onClick={() => router.push('/csos')}
            >
              Browse All CSOs
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              onClick={() => router.push('/how-it-works')}
            >
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
