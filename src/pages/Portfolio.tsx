import { Header } from '@/components/layout/Header';
import { PortfolioDashboard } from '@/components/portfolio/PortfolioDashboard';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Header />
      
      <main className="container py-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Track your assets and transactions</p>
        </div>
        <PortfolioDashboard />
      </main>
    </div>
  );
};

export default Portfolio;
