import { Header } from '@/components/layout/Header';
import { StakingDashboard } from '@/components/staking/StakingDashboard';

const Stake = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <Header />
      
      <main className="container py-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Staking</h1>
          <p className="text-muted-foreground">Stake your tokens and earn rewards</p>
        </div>
        <StakingDashboard />
      </main>
    </div>
  );
};

export default Stake;
