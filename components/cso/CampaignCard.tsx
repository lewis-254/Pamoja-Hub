import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatKES, clampPercent } from '@/lib/utils';
import type { Campaign } from '@/lib/types';

interface CampaignCardProps {
  campaign: Campaign;
  onContribute?: () => void;
}

export default function CampaignCard({ campaign, onContribute }: CampaignCardProps) {
  const pct = clampPercent(campaign.raisedAmount, campaign.targetAmount);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36 w-full">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-sm text-gray-900 mb-1 leading-tight">{campaign.title}</h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{campaign.description}</p>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span className="font-medium text-pamoja-green-600">{formatKES(campaign.raisedAmount)} raised</span>
            <span className="font-semibold">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Goal: {formatKES(campaign.targetAmount)}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span suppressHydrationWarning>
                {new Date(campaign.deadline).toLocaleDateString('en-KE', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          className="w-full bg-pamoja-green-500 hover:bg-pamoja-green-600 text-white"
          onClick={onContribute}
        >
          Contribute
        </Button>
      </div>
    </div>
  );
}
