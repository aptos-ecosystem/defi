import { Header } from '@/components/layout/Header';
import { SwapCard } from '@/components/swap/SwapCard';

const Swap = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="container py-12 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Swap Tokens</h1>
          <p className="text-muted-foreground">Trade tokens instantly with the best rates</p>
        </div>
        <SwapCard />
      </main>
    </div>
  );
};

export default Swap;
