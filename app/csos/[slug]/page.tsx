'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Share2, MapPin, Globe, Mail, Phone,
  Calendar, Hash, BadgeCheck, Users, Briefcase, Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from '@/components/cso/CampaignCard';
import DonateTab from '@/components/cso/DonateTab';
import SkillsTab from '@/components/cso/SkillsTab';
import CollaborateTab from '@/components/cso/CollaborateTab';
import { mockCSOs } from '@/lib/mock-data';
import { CATEGORY_COLORS } from '@/lib/utils';
import type { CSO } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CSOProfilePage({ params }: Props) {
  const { slug } = use(params);
  const found = mockCSOs.find((c) => c.slug === slug);
  if (!found) notFound();
  const cso = found as CSO;

  function handleShare() {
    if (navigator.share) {
      void navigator.share({ title: cso.name, url: window.location.href });
    } else {
      void navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover photo */}
      <div className="relative h-72 w-full">
        <Image
          src={cso.coverImage}
          alt={`${cso.name} cover`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 left-4">
          <Link href="/csos">
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Search
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>

        {/* CSO Logo */}
        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={cso.logo}
            alt={`${cso.name} logo`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: About */}
          <div className="flex-1 min-w-0">
            {/* Name & verification */}
            <div className="flex items-start gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{cso.name}</h1>
                  {cso.verified && (
                    <BadgeCheck className="w-6 h-6 text-pamoja-green-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-gray-500 mt-1">{cso.tagline}</p>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cso.categories.map((cat) => (
                <span
                  key={cat}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[cat]}`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Mission & Vision */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cso.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cso.vision}</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Organisation Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { icon: Calendar, label: 'Founded', value: cso.founded.toString() },
                  { icon: Hash, label: 'Reg. No.', value: cso.regNo },
                  { icon: MapPin, label: 'Location', value: cso.location },
                  { icon: Building2, label: 'County', value: cso.county },
                  { icon: Globe, label: 'Website', value: cso.website, link: true },
                  { icon: Mail, label: 'Email', value: cso.email, link: true, prefix: 'mailto:' },
                  { icon: Phone, label: 'Phone', value: cso.phone },
                ].map(({ icon: Icon, label, value, link, prefix }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 text-xs">{label}: </span>
                      {link ? (
                        <a
                          href={`${prefix ?? ''}${value}`}
                          className="text-pamoja-green-600 hover:underline text-xs"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-gray-700 text-xs">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'People Served', value: cso.stats.peopleServed.toLocaleString(), icon: Users },
                { label: 'Projects Completed', value: cso.stats.projectsCompleted.toString(), icon: Briefcase },
                { label: 'Communities Active', value: cso.stats.communitiesActive.toString(), icon: Building2 },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
                >
                  <Icon className="w-5 h-5 text-pamoja-green-500 mx-auto mb-1" />
                  <div className="font-bold text-lg text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Action Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">How to Support</h3>
              <Tabs defaultValue="donate">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="donate" className="flex-1">Donate</TabsTrigger>
                  <TabsTrigger value="skills" className="flex-1">Offer Skills</TabsTrigger>
                  <TabsTrigger value="collaborate" className="flex-1">Collaborate</TabsTrigger>
                </TabsList>
                <TabsContent value="donate">
                  <DonateTab cso={cso} />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsTab />
                </TabsContent>
                <TabsContent value="collaborate">
                  <CollaborateTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right: Campaigns */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Support Campaigns</h2>
              <div className="space-y-4">
                {cso.campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
