'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'citizen' | 'cso'>('citizen');
  const { login } = useAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, password, role);
    router.push(role === 'citizen' ? '/dashboard/citizen' : '/dashboard/cso');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-pamoja-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900">PamojaHub</span>
          </div>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {/* Role toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            {(['citizen', 'cso'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  role === r ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r === 'citizen' ? 'Citizen' : 'CSO / Organisation'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {role === 'citizen' ? 'Full Name' : 'Organisation Name'}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'citizen' ? 'Jane Muthoni' : 'Green Earth Initiative'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0712 345 678"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                minLength={8}
              />
            </div>

            <Button type="submit" className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-pamoja-green-600 font-medium hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-3">
            By signing up you agree to our{' '}
            <Link href="#" className="underline">Terms</Link> and{' '}
            <Link href="#" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
