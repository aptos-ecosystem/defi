import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowLeftRight, Coins, Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TokenIcon } from '@/components/shared/TokenIcon';
import { portfolioData, tokens, stakingPools, priceHistory } from '@/data/mock-data';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const quickStats = [
  { label: 'Total Value Locked', value: '$2.4B', change: '+5.2%', positive: true, icon: Wallet },
  { label: 'Trading Volume 24h', value: '$847M', change: '+12.3%', positive: true, icon: ArrowLeftRight },
  { label: 'Active Stakers', value: '124.5K', change: '+2.1%', positive: true, icon: Coins },
  { label: 'Transactions', value: '1.2M', change: '-0.5%', positive: false, icon: Activity },
];

export function DashboardOverview() {
  const isPositive = portfolioData.change24h >= 0;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className={`text-sm mt-1 ${stat.positive ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Portfolio Summary & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Overview</CardTitle>
            <Link to="/portfolio">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-3xl font-bold font-mono">
                  ${portfolioData.totalValue.toLocaleString()}
                </p>
                <p className={`flex items-center gap-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {isPositive ? '+' : ''}{portfolioData.change24h}% (24h)
                </p>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(174, 72%, 50%)" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/swap">
              <Button variant="gradient" className="w-full justify-start" size="lg">
                <ArrowLeftRight className="h-5 w-5 mr-2" />
                Swap Tokens
              </Button>
            </Link>
            <Link to="/stake">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Coins className="h-5 w-5 mr-2" />
                Stake & Earn
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Wallet className="h-5 w-5 mr-2" />
                View Portfolio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Top Tokens & Staking Pools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Tokens</CardTitle>
            <Link to="/swap">
              <Button variant="ghost" size="sm">Trade</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tokens.slice(0, 4).map((token, index) => (
                <motion.div
                  key={token.symbol}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TokenIcon symbol={token.symbol} size="sm" />
                    <div>
                      <p className="font-medium">{token.symbol}</p>
                      <p className="text-sm text-muted-foreground">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">${token.price.toLocaleString()}</p>
                    <p className={`text-sm ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Staking Pools</CardTitle>
            <Link to="/stake">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stakingPools.slice(0, 4).map((pool, index) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <TokenIcon symbol={pool.tokenSymbol} size="sm" />
                    <div>
                      <p className="font-medium">{pool.name}</p>
                      <p className="text-sm text-muted-foreground">
                        TVL: ${(pool.tvl / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">{pool.apr}%</p>
                    <p className="text-sm text-muted-foreground">APR</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
