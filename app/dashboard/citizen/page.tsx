'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard, Heart, Wrench, Settings, Star,
  TrendingUp, Clock, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CSOCard from '@/components/cso/CSOCard';
import { mockCitizen, mockDonations, mockSkillOffers, mockCSOs } from '@/lib/mock-data';
import { formatKES, CATEGORY_COLORS } from '@/lib/utils';

const NAV_ITEMS = [
  { id: 'impact', label: 'My Impact', icon: LayoutDashboard },
  { id: 'csos', label: 'Recommended CSOs', icon: Star },
  { id: 'donations', label: 'My Donations', icon: Heart },
  { id: 'skills', label: 'My Skills', icon: Wrench },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function CitizenDashboard() {
  const [activeNav, setActiveNav] = useState('impact');
  const citizen = mockCitizen;
  const supportedCSOs = mockCSOs.filter((c) => citizen.supportedCSOs.includes(c.id));
  const recommendedCSOs = mockCSOs.filter((c) => !citizen.supportedCSOs.includes(c.id)).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={citizen.avatar} alt={citizen.name} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">{citizen.name}</p>
              <p className="text-xs text-gray-500">{citizen.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNav === id
                  ? 'bg-pamoja-green-50 text-pamoja-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* My Impact */}
        {activeNav === 'impact' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">My Impact</h1>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Donated', value: formatKES(citizen.totalDonated), icon: Heart, color: 'text-red-500' },
                { label: 'Donations Made', value: citizen.donationCount.toString(), icon: TrendingUp, color: 'text-blue-500' },
                { label: 'Skills Offered', value: citizen.skillsOffered.toString(), icon: Wrench, color: 'text-purple-500' },
                { label: 'CSOs Supported', value: citizen.supportedCSOs.length.toString(), icon: Star, color: 'text-amber-500' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <div className="text-xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Pending skill offers */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Pending Requests
              </h2>
              {mockSkillOffers.map((offer) => {
                const cso = mockCSOs.find((c) => c.id === offer.csoId);
                return (
                  <div key={offer.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{offer.skillCategory} — {cso?.name}</p>
                      <p className="text-xs text-gray-500">{offer.hoursAvailable}h/week · {offer.description.slice(0, 60)}...</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>
                  </div>
                );
              })}
            </div>

            {/* Recommended CSOs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedCSOs.map((cso) => (
                  <CSOCard key={cso.id} cso={cso} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recommended CSOs view */}
        {activeNav === 'csos' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">Recommended CSOs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCSOs.slice(0, 6).map((cso) => (
                <CSOCard key={cso.id} cso={cso} />
              ))}
            </div>
          </div>
        )}

        {/* Donations view */}
        {activeNav === 'donations' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">My Donations</h1>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Date', 'Organisation', 'Amount', 'Method', 'Status'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockDonations.map((d) => {
                    const cso = mockCSOs.find((c) => c.id === d.csoId);
                    return (
                      <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(d.timestamp).toLocaleDateString('en-KE')}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{cso?.name}</td>
                        <td className="px-4 py-3 text-pamoja-green-600 font-semibold">{formatKES(d.amount)}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{d.method}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Skills view */}
        {activeNav === 'skills' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">My Skills</h1>
            <div className="space-y-4">
              {mockSkillOffers.map((offer) => {
                const cso = mockCSOs.find((c) => c.id === offer.csoId);
                return (
                  <div key={offer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{offer.skillCategory}</p>
                        <p className="text-sm text-gray-500 mt-1">{offer.description}</p>
                        <p className="text-xs text-gray-400 mt-2">For: {cso?.name} · {offer.hoursAvailable}h/week</p>
                      </div>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Settings placeholder */}
        {activeNav === 'settings' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <Settings className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Account settings coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
