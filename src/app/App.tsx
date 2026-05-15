import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Security } from './components/Security';
import { Process } from './components/Process';
import { UseCases } from './components/UseCases';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import type { HomeContent } from '@/lib/content/schemas';

export default function App({ content }: { content: HomeContent }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero content={content.hero} />
        <Capabilities content={content.capabilities} />
        <Security content={content.security} />
        <Process content={content.process} />
        <UseCases content={content.useCases} />
        <FinalCTA content={content.finalCta} />
      </main>
      <Footer />
    </div>
  );
}
