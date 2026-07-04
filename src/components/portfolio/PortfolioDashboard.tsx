import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Clock, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TokenIcon } from '@/components/shared/TokenIcon';
import { portfolioData, tokens, recentTransactions, priceHistory } from '@/data/mock-data';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(174, 72%, 50%)', 'hsl(262, 83%, 65%)', 'hsl(142, 70%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(215, 20%, 55%)'];

export function PortfolioDashboard() {
  const isPositive = portfolioData.change24h >= 0;

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Total Value Card */}
        <Card variant="glass" className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-muted-foreground mb-1">Total Portfolio Value</p>
                <p className="text-4xl font-bold font-mono">
                  ${portfolioData.totalValue.toLocaleString()}
                </p>
                <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-medium">{isPositive ? '+' : ''}{portfolioData.change24h}%</span>
                  <span className="text-muted-foreground ml-1">
                    ({isPositive ? '+' : ''}${portfolioData.changeValue.toFixed(2)}) 24h
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <Wallet className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Price Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174, 72%, 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(174, 72%, 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    hide 
                    domain={['dataMin - 50', 'dataMax + 50']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222, 47%, 9%)', 
                      border: '1px solid hsl(222, 30%, 18%)',
                      borderRadius: '8px',
                      color: 'hsl(210, 40%, 98%)'
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(174, 72%, 50%)" 
                    strokeWidth={2}
                    dot={false}
                    fill="url(#colorPrice)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Pie Chart */}
        <Card variant="glass">
          <CardHeader className="pb-2">
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData.allocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolioData.allocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222, 47%, 9%)', 
                      border: '1px solid hsl(222, 30%, 18%)',
                      borderRadius: '8px',
                      color: 'hsl(210, 40%, 98%)'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {portfolioData.allocation.map((item, index) => (
                <div key={item.token} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.token}</span>
                  </div>
                  <span className="font-mono">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Holdings */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Your Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tokens.slice(0, 5).map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <TokenIcon symbol={token.symbol} />
                  <div>
                    <p className="font-medium">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium">{token.balance}</p>
                  <p className="text-sm text-muted-foreground">
                    ${(parseFloat(token.balance || '0') * token.price).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono">${token.price.toLocaleString()}</p>
                  <p className={`text-sm flex items-center justify-end gap-1 ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {token.priceChange24h >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(token.priceChange24h)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    tx.status === 'confirmed' ? 'bg-success/10' :
                    tx.status === 'pending' ? 'bg-warning/10' : 'bg-destructive/10'
                  }`}>
                    {tx.status === 'confirmed' ? <Check className="h-4 w-4 text-success" /> :
                     tx.status === 'pending' ? <Clock className="h-4 w-4 text-warning" /> :
                     <X className="h-4 w-4 text-destructive" />}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{tx.type}</p>
                    <p className="text-sm text-muted-foreground font-mono">{tx.hash}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono">{tx.amount} {tx.token}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
