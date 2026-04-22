export type CauseCategory =
  | 'Health'
  | 'Education'
  | 'Environment'
  | 'Human Rights'
  | 'E-Government'
  | 'Women Empowerment'
  | 'Youth';

export interface Campaign {
  id: string;
  csoId: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  deadline: string;
  category: CauseCategory;
  image: string;
}

export interface CSO {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  mission: string;
  vision: string;
  founded: number;
  regNo: string;
  location: string;
  county: string;
  website: string;
  email: string;
  phone: string;
  categories: CauseCategory[];
  coverImage: string;
  logo: string;
  stats: {
    peopleServed: number;
    projectsCompleted: number;
    communitiesActive: number;
    volunteersEngaged: number;
  };
  campaigns: Campaign[];
  verified: boolean;
  featured: boolean;
}

export interface Donation {
  id: string;
  citizenId: string;
  csoId: string;
  campaignId?: string;
  amount: number;
  method: 'mpesa' | 'card';
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface SkillOffer {
  id: string;
  citizenId: string;
  csoId: string;
  skillCategory: string;
  description: string;
  hoursAvailable: number;
  status: 'pending' | 'accepted' | 'completed';
}

export interface Citizen {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalDonated: number;
  donationCount: number;
  skillsOffered: number;
  supportedCSOs: string[];
}
