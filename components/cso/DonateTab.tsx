'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CSO } from '@/lib/types';

const mpesaSchema = z.object({
  phone: z
    .string()
    .regex(/^(07|01|2547|2541)\d{8}$/, 'Enter a valid Kenyan phone number (e.g. 0712345678)'),
  amount: z.number().min(10, 'Minimum donation is KES 10'),
});

const cardSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, 'Enter a valid 16-digit card number'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'Enter a valid CVV'),
});

type MpesaForm = z.infer<typeof mpesaSchema>;
type CardForm = z.infer<typeof cardSchema>;

type MpesaState = 'idle' | 'loading' | 'success' | 'error';
type CardState = 'idle' | 'loading' | 'success';

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

interface DonateTabProps {
  cso: CSO;
}

export default function DonateTab({ cso }: DonateTabProps) {
  const [mpesaState, setMpesaState] = useState<MpesaState>('idle');
  const [mpesaMsg, setMpesaMsg] = useState('');
  const [cardState, setCardState] = useState<CardState>('idle');

  const mpesaForm = useForm<MpesaForm>({ resolver: zodResolver(mpesaSchema) });
  const cardForm = useForm<CardForm>({ resolver: zodResolver(cardSchema) });

  async function onMpesaSubmit(data: MpesaForm) {
    setMpesaState('loading');
    try {
      const res = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: data.phone, amount: data.amount, csoName: cso.name }),
      });
      const json = await res.json();
      if (json.success) {
        setMpesaState('success');
        setMpesaMsg(json.message);
      } else {
        setMpesaState('error');
        setMpesaMsg(json.message);
      }
    } catch {
      setMpesaState('error');
      setMpesaMsg('Network error. Please try again.');
    }
  }

  async function onCardSubmit(_data: CardForm) {
    setCardState('loading');
    await new Promise((r) => setTimeout(r, 2000));
    setCardState('success');
  }

  return (
    <div>
      <Tabs defaultValue="mpesa">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="mpesa" className="flex-1">Donate via M-Pesa</TabsTrigger>
          <TabsTrigger value="card" className="flex-1">Credit / Debit Card</TabsTrigger>
        </TabsList>

        {/* M-Pesa Tab */}
        <TabsContent value="mpesa">
          {mpesaState === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-pamoja-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Request Sent!</h3>
              <p className="text-sm text-gray-600">{mpesaMsg}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setMpesaState('idle'); mpesaForm.reset(); }}
              >
                Make Another Donation
              </Button>
            </div>
          ) : mpesaState === 'error' ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Request Failed</h3>
              <p className="text-sm text-gray-600">{mpesaMsg}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setMpesaState('idle')}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <form onSubmit={mpesaForm.handleSubmit(onMpesaSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  M-Pesa Phone Number
                </label>
                <Input
                  {...mpesaForm.register('phone')}
                  placeholder="0712 345 678"
                  disabled={mpesaState === 'loading'}
                />
                {mpesaForm.formState.errors.phone && (
                  <p className="text-xs text-red-500 mt-1">
                    {mpesaForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (KES)
                </label>
                <Input
                  {...mpesaForm.register('amount', { valueAsNumber: true })}
                  type="number"
                  placeholder="Enter amount"
                  disabled={mpesaState === 'loading'}
                />
                {mpesaForm.formState.errors.amount && (
                  <p className="text-xs text-red-500 mt-1">
                    {mpesaForm.formState.errors.amount.message}
                  </p>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {QUICK_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => mpesaForm.setValue('amount', amt)}
                      className="text-xs px-3 py-1 rounded-full border border-pamoja-green-300 text-pamoja-green-700 hover:bg-pamoja-green-50 transition-colors"
                    >
                      KES {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white"
                disabled={mpesaState === 'loading'}
              >
                {mpesaState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending request to your phone...
                  </>
                ) : (
                  'Submit to STK Push'
                )}
              </Button>
              <p className="text-xs text-gray-400 text-center">
                You will receive an M-Pesa prompt on your phone. Enter your PIN to complete.
              </p>
            </form>
          )}
        </TabsContent>

        {/* Card Tab */}
        <TabsContent value="card">
          {cardState === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-pamoja-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Payment Successful!</h3>
              <p className="text-sm text-gray-600">
                Thank you for supporting {cso.name}. You will receive a receipt by email.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setCardState('idle'); cardForm.reset(); }}
              >
                Make Another Donation
              </Button>
            </div>
          ) : (
            <form onSubmit={cardForm.handleSubmit(onCardSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <Input
                  {...cardForm.register('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                  disabled={cardState === 'loading'}
                />
                {cardForm.formState.errors.cardNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {cardForm.formState.errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <Input
                    {...cardForm.register('expiry')}
                    placeholder="08/28"
                    maxLength={5}
                    disabled={cardState === 'loading'}
                  />
                  {cardForm.formState.errors.expiry && (
                    <p className="text-xs text-red-500 mt-1">{cardForm.formState.errors.expiry.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <Input
                    {...cardForm.register('cvv')}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    disabled={cardState === 'loading'}
                  />
                  {cardForm.formState.errors.cvv && (
                    <p className="text-xs text-red-500 mt-1">{cardForm.formState.errors.cvv.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white"
                disabled={cardState === 'loading'}
              >
                {cardState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Make Secure Payment
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-400 text-center">
                Secured with 256-bit SSL encryption. Demo only — no real charges.
              </p>
            </form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
