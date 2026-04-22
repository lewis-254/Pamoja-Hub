'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  partnershipType: z.string().min(1, 'Select a partnership type'),
  message: z.string().min(30, 'Please provide at least 30 characters'),
  contactName: z.string().min(2, 'Enter your name'),
  contactEmail: z.string().email('Enter a valid email'),
  contactOrg: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PARTNERSHIP_TYPES = [
  'Joint Programming',
  'Resource Sharing',
  'Advocacy Coalition',
  'Capacity Building',
  'Grant Partnership',
  'Corporate Social Responsibility',
  'Other',
];

export default function CollaborateTab() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(_data: FormData) {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-12 h-12 text-pamoja-green-500 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">Request Sent!</h3>
        <p className="text-sm text-gray-600">
          Your collaboration request has been submitted. The CSO team will respond within 5–7 business days.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Send Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Partnership Type</label>
        <Select onValueChange={(v) => setValue('partnershipType', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select partnership type..." />
          </SelectTrigger>
          <SelectContent>
            {PARTNERSHIP_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.partnershipType && (
          <p className="text-xs text-red-500 mt-1">{errors.partnershipType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
        <Textarea
          {...register('message')}
          placeholder="Describe your collaboration proposal, what you bring to the partnership, and what you hope to achieve together..."
          rows={4}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <Input {...register('contactName')} placeholder="Jane Muthoni" />
          {errors.contactName && (
            <p className="text-xs text-red-500 mt-1">{errors.contactName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input {...register('contactEmail')} type="email" placeholder="jane@example.com" />
          {errors.contactEmail && (
            <p className="text-xs text-red-500 mt-1">{errors.contactEmail.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organisation (optional)
        </label>
        <Input {...register('contactOrg')} placeholder="Your organisation name" />
      </div>

      <Button type="submit" className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
        Send Request
      </Button>
    </form>
  );
}
