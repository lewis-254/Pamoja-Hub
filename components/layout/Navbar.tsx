'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Browse CSOs', href: '/csos' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Explore Causes', href: '/causes' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-pamoja-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">PamojaHub</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-pamoja-green-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href={user.role === 'citizen' ? '/dashboard/citizen' : '/dashboard/cso'}
                  className="text-sm font-medium text-gray-600 hover:text-pamoja-green-600"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn('md:hidden border-t border-gray-100 bg-white', open ? 'block' : 'hidden')}>
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-pamoja-green-600 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={user.role === 'citizen' ? '/dashboard/citizen' : '/dashboard/cso'}
                  onClick={() => setOpen(false)}
                >
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
                <Button onClick={() => { handleLogout(); setOpen(false); }} variant="ghost" className="w-full">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
