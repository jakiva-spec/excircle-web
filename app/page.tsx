import { Hero } from '@/components/sections/hero';
import { Credibility } from '@/components/sections/credibility';
import { About } from '@/components/sections/about';
import { WhoIHelp } from '@/components/sections/who-i-help';
import { WhatIDo } from '@/components/sections/what-i-do';
import { Framework } from '@/components/sections/framework';
import { CaseStudies } from '@/components/sections/case-studies';
import { InsightPreview } from '@/components/sections/insight-preview';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <WhoIHelp />
      <WhatIDo />
      <Framework />
      <CaseStudies />
      <InsightPreview />
      <ContactCTA />
    </div>
  );
}
