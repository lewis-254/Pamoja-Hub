import { Leaf, Banknote, Users } from 'lucide-react';

const stats = [
  { icon: Leaf, value: '150+', label: 'CSOs on Platform', color: 'text-pamoja-green-600' },
  { icon: Banknote, value: 'KES 2.5M', label: 'Raised for Causes', color: 'text-amber-600' },
  { icon: Users, value: '800+', label: 'Active Volunteers', color: 'text-blue-600' },
];

export default function QuickStats() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
