import HeroSection from '@/components/home/HeroSection';
import QuickStats from '@/components/home/QuickStats';
import FeaturedCSOs from '@/components/home/FeaturedCSOs';
import HowItWorks from '@/components/home/HowItWorks';
import ExploreCauses from '@/components/home/ExploreCauses';
import SuccessStories from '@/components/home/SuccessStories';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickStats />
      <FeaturedCSOs />
      <HowItWorks />
      <ExploreCauses />
      <SuccessStories />
    </>
  );
}
