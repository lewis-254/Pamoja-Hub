'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  LayoutDashboard, BarChart2, DollarSign, Users,
  FileText, Settings, CheckCircle2, Clock,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { formatKES } from '@/lib/utils';
import { mockCSODashboard } from '@/lib/mock-data';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'campaigns', label: 'Campaigns', icon: BarChart2 },
  { id: 'donations', label: 'Donations', icon: DollarSign },
  { id: 'volunteers', label: 'Volunteers', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function CSODashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const dash = mockCSODashboard;

  const chartData = dash.campaignPerformance.map((c) => ({
    name: c.name,
    Raised: Math.round(c.raised / 1000),
    Target: Math.round(c.target / 1000),
  }));

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={dash.cso.logo}
                alt={dash.cso.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="font-semibold text-xs text-gray-900 leading-tight">{dash.cso.name}</p>
              <p className="text-xs text-pamoja-green-600">CSO Admin</p>
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
        {activeNav === 'overview' && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            {/* Key stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Raised', value: formatKES(dash.stats.totalRaised), icon: DollarSign, color: 'text-pamoja-green-500' },
                { label: 'Active Campaigns', value: dash.stats.activeCampaigns.toString(), icon: BarChart2, color: 'text-blue-500' },
                { label: 'Volunteers', value: dash.stats.volunteers.toString(), icon: Users, color: 'text-purple-500' },
                { label: 'Communities', value: dash.stats.communities.toString(), icon: LayoutDashboard, color: 'text-amber-500' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <div className="text-xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Campaign performance chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-gray-800 mb-4">Campaign Performance (KES thousands)</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => [`KES ${value}K`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="Target" fill="#dcfce7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Raised" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-400 mt-2 text-center">
                <span className="inline-block w-3 h-3 rounded bg-pamoja-green-500 mr-1 align-middle" /> Raised &nbsp;
                <span className="inline-block w-3 h-3 rounded bg-pamoja-green-100 mr-1 align-middle" /> Target
              </p>
            </div>

            {/* Recent donations */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-semibold text-gray-800 mb-4">Recent Donations</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-100">
                    <tr>
                      {['Date', 'Donor', 'Amount', 'Method'].map((h) => (
                        <th key={h} className="text-left py-2 px-2 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dash.recentDonations.map((d) => (
                      <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-2 text-gray-500">{d.date}</td>
                        <td className="py-2.5 px-2 font-medium text-gray-700">{d.donor}</td>
                        <td className="py-2.5 px-2 text-pamoja-green-600 font-semibold">{formatKES(d.amount)}</td>
                        <td className="py-2.5 px-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            d.method === 'M-Pesa' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {d.method}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending skill offers */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Pending Skill Offers from Volunteers
              </h2>
              <div className="space-y-3">
                {dash.pendingSkillOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{offer.name}</p>
                      <p className="text-xs text-gray-500">{offer.skill} · {offer.hours}h/week</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white h-7 text-xs">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Placeholder views */}
        {['campaigns', 'donations', 'volunteers', 'reports', 'settings'].includes(activeNav) && (
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-6 capitalize">{activeNav}</h1>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-gray-500 text-sm">
                The {activeNav} section is available in the full release. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
