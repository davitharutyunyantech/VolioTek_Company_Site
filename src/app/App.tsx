import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Security } from './components/Security';
import { Process } from './components/Process';
import { UseCases } from './components/UseCases';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Security />
        <Process />
        <UseCases />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
