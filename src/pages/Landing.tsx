import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet, TrendingUp, Shield, Zap, BarChart3, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

const features = [
  {
    icon: Wallet,
    title: 'Multi-Wallet Support',
    description: 'Connect with MetaMask, WalletConnect, and more. Seamless integration across all major wallets.',
  },
  {
    icon: TrendingUp,
    title: 'Token Swaps',
    description: 'Swap tokens instantly with the best rates from aggregated DEX liquidity pools.',
  },
  {
    icon: Coins,
    title: 'Staking Rewards',
    description: 'Earn passive income by staking your tokens with competitive APY rates.',
  },
  {
    icon: BarChart3,
    title: 'Portfolio Analytics',
    description: 'Track your holdings, monitor performance, and analyze your DeFi positions.',
  },
  {
    icon: Shield,
    title: 'Secure & Audited',
    description: 'Your assets are protected with industry-leading security standards.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Execute transactions quickly with optimized gas estimation.',
  },
];

const stats = [
  { value: '$2.4B+', label: 'Total Value Locked' },
  { value: '150K+', label: 'Active Users' },
  { value: '$890M+', label: 'Trading Volume' },
  { value: '99.9%', label: 'Uptime' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              The Future of Decentralized Finance
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Trade, Stake &</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Grow Your Crypto
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Access the most powerful DeFi tools in one platform. Swap tokens, earn staking rewards, 
              and track your portfolio with real-time analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                <Link to="/dashboard">
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-border/50 hover:bg-card/50">
                <Link to="/swap">
                  Start Trading
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for both beginners and experienced DeFi users
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 border border-border/30 backdrop-blur-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Start Your DeFi Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of users already trading, staking, and earning with our platform.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border/30">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          © 2024 DeFi Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
