import Link from 'next/link';
import { Leaf, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-pamoja-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">PamojaHub</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Connecting Kenyan citizens to Civil Society Organizations making a
              difference in communities across the country.
            </p>
            <div className="flex gap-4 mt-4">
              {['Twitter/X', 'Facebook', 'Instagram', 'LinkedIn'].map((label) => (
                <a key={label} href="#" className="text-gray-400 hover:text-pamoja-green-400 transition-colors text-xs font-medium">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Platform</h4>
            <ul className="space-y-2 text-sm">
              {['Browse CSOs', 'How It Works', 'Explore Causes', 'For CSOs'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pamoja-green-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About', 'Privacy Policy', 'Terms of Service', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pamoja-green-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500 text-center">
          © 2026 PamojaHub. All rights reserved. Built with ❤️ for Kenya.
        </div>
      </div>
    </footer>
  );
}
