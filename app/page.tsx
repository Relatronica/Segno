'use client';

import { useAppStore } from '@/store/useAppStore';
import { OnboardingModule } from '@/modules/onboarding/OnboardingModule';
import { CityBuilderModule } from '@/modules/city-builder/CityBuilderModule';
import { AnalysisModule } from '@/modules/analysis/AnalysisModule';
import { WikiModule } from '@/modules/wiki/WikiModule';

export default function Home() {
  const { currentStep } = useAppStore();

  return (
    <main className="min-h-screen bg-background">
      {currentStep === 'onboarding' && <OnboardingModule />}
      {currentStep === 'builder' && <CityBuilderModule />}
      {currentStep === 'analysis' && <AnalysisModule />}
      {currentStep === 'wiki' && <WikiModule />}
    </main>
  );
}
