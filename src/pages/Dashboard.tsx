import { Header } from '@/components/layout/Header';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <Header />
      
      <main className="container py-8 relative">
        <DashboardOverview />
      </main>
    </div>
  );
};

export default Dashboard;
