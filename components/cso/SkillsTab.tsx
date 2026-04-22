'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const schema = z.object({
  skillCategory: z.string().min(1, 'Select a skill category'),
  description: z.string().min(20, 'Please provide at least 20 characters'),
  hoursAvailable: z.number().min(1, 'Enter at least 1 hour per week'),
});

type FormData = z.infer<typeof schema>;

const SKILL_CATEGORIES = ['Legal', 'Technical', 'Communications', 'Finance', 'Healthcare', 'Education', 'Other'];

export default function SkillsTab() {
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
        <h3 className="font-semibold text-gray-900 mb-1">Offer Submitted!</h3>
        <p className="text-sm text-gray-600">
          The CSO will review your offer and get back to you within 3–5 business days.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Submit Another Offer
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Category</label>
        <Select onValueChange={(v) => setValue('skillCategory', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your skill area..." />
          </SelectTrigger>
          <SelectContent>
            {SKILL_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.skillCategory && (
          <p className="text-xs text-red-500 mt-1">{errors.skillCategory.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How can you help? (describe your skills)
        </label>
        <Textarea
          {...register('description')}
          placeholder="e.g. I'm a qualified accountant and can help with financial reporting and donor compliance..."
          rows={4}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hours available per week
        </label>
        <Input
          {...register('hoursAvailable', { valueAsNumber: true })}
          type="number"
          min={1}
          placeholder="4"
        />
        {errors.hoursAvailable && (
          <p className="text-xs text-red-500 mt-1">{errors.hoursAvailable.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white">
        Submit Offer
      </Button>
    </form>
  );
}
