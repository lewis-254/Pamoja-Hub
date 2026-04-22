import { UserPlus, Heart, BarChart3, Rocket, Handshake, Network } from 'lucide-react';

const columns = [
  {
    title: 'For Citizens',
    color: 'bg-pamoja-green-50 border-pamoja-green-100',
    titleColor: 'text-pamoja-green-700',
    steps: [
      { icon: UserPlus, label: 'Create Your Profile', desc: 'Sign up and tell us the causes you care about.' },
      { icon: Heart, label: 'Choose How to Support', desc: 'Donate, offer skills, or collaborate with CSOs.' },
      { icon: BarChart3, label: 'Track Your Impact', desc: 'See real-time updates on how your support is used.' },
    ],
  },
  {
    title: 'For CSOs',
    color: 'bg-blue-50 border-blue-100',
    titleColor: 'text-blue-700',
    steps: [
      { icon: Rocket, label: 'Create Your Profile', desc: 'Get verified and showcase your mission and impact.' },
      { icon: BarChart3, label: 'Launch Campaigns', desc: 'Set fundraising goals and publish cause campaigns.' },
      { icon: Handshake, label: 'Receive Support', desc: 'Accept donations, volunteers, and partnerships.' },
    ],
  },
  {
    title: 'For Networks',
    color: 'bg-purple-50 border-purple-100',
    titleColor: 'text-purple-700',
    steps: [
      { icon: Network, label: 'List Your Resources', desc: 'Share expertise, training, and grant opportunities.' },
      { icon: UserPlus, label: 'Find Partners', desc: 'Discover CSOs aligned with your mission.' },
      { icon: Handshake, label: 'Exchange Value', desc: 'Build sustainable multi-sector collaborations.' },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            PamojaHub brings citizens, CSOs, and networks together on one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map(({ title, color, titleColor, steps }) => (
            <div key={title} className={`rounded-2xl border p-6 ${color}`}>
              <h3 className={`font-bold text-lg mb-5 ${titleColor}`}>{title}</h3>
              <div className="space-y-5">
                {steps.map(({ icon: Icon, label, desc }, i) => (
                  <div key={label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="font-semibold text-sm text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
