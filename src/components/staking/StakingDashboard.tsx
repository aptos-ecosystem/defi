import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Lock, Gift, Timer, TrendingUp, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TokenIcon } from '@/components/shared/TokenIcon';
import { stakingPools, StakingPool } from '@/data/mock-data';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface StakingCardProps {
  pool: StakingPool;
}

function StakingCard({ pool }: StakingCardProps) {
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setIsStaking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsStaking(false);
    toast.success(`Staked ${stakeAmount} ${pool.tokenSymbol}`);
    setStakeAmount('');
  };

  const handleUnstake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setIsUnstaking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUnstaking(false);
    toast.success(`Unstaked ${stakeAmount} ${pool.tokenSymbol}`);
    setStakeAmount('');
  };

  const handleClaim = async () => {
    if (parseFloat(pool.earnedRewards) <= 0) {
      toast.error('No rewards to claim');
      return;
    }
    setIsClaiming(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsClaiming(false);
    toast.success(`Claimed ${pool.earnedRewards} ${pool.rewardToken}`);
  };

  const formatTVL = (tvl: number) => {
    if (tvl >= 1000000) return `$${(tvl / 1000000).toFixed(1)}M`;
    if (tvl >= 1000) return `$${(tvl / 1000).toFixed(1)}K`;
    return `$${tvl}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="glass" className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TokenIcon symbol={pool.tokenSymbol} size="lg" />
              <div>
                <CardTitle>{pool.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Earn {pool.rewardToken}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-success">{pool.apr}%</p>
              <p className="text-sm text-muted-foreground">APR</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/30">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">TVL</p>
              <p className="font-semibold">{formatTVL(pool.tvl)}</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-sm text-muted-foreground">Staked</p>
              <p className="font-mono font-semibold">{pool.stakedAmount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Earned</p>
              <p className="font-mono font-semibold text-success">{pool.earnedRewards}</p>
            </div>
          </div>

          {/* Lockup Period */}
          {pool.lockupPeriod > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <Lock className="h-4 w-4 text-accent" />
              <span className="text-sm">
                {pool.lockupPeriod} day lockup period
              </span>
            </div>
          )}

          {/* Action Tabs */}
          <div className="flex gap-2 p-1 rounded-lg bg-secondary/30">
            <Button
              variant={activeTab === 'stake' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab('stake')}
            >
              Stake
            </Button>
            <Button
              variant={activeTab === 'unstake' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setActiveTab('unstake')}
            >
              Unstake
            </Button>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {activeTab === 'stake' ? 'Amount to stake' : 'Amount to unstake'}
              </span>
              <span className="text-muted-foreground">
                Available: {activeTab === 'stake' ? '1000' : pool.stakedAmount} {pool.tokenSymbol}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStakeAmount(activeTab === 'stake' ? '1000' : pool.stakedAmount)}
              >
                Max
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {activeTab === 'stake' ? (
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleStake}
                disabled={isStaking}
              >
                {isStaking ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Staking...
                  </>
                ) : (
                  <>
                    <Coins className="h-4 w-4" />
                    Stake {pool.tokenSymbol}
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleUnstake}
                disabled={isUnstaking || parseFloat(pool.stakedAmount) === 0}
              >
                {isUnstaking ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Unstaking...
                  </>
                ) : (
                  <>
                    <Coins className="h-4 w-4" />
                    Unstake {pool.tokenSymbol}
                  </>
                )}
              </Button>
            )}

            {parseFloat(pool.earnedRewards) > 0 && (
              <Button
                variant="success"
                className="w-full"
                onClick={handleClaim}
                disabled={isClaiming}
              >
                {isClaiming ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <Gift className="h-4 w-4" />
                    Claim {pool.earnedRewards} {pool.rewardToken}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function StakingDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Staked Value</p>
                <p className="text-2xl font-bold">$12,456.78</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
                <p className="text-2xl font-bold text-success">$1,234.56</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent/10">
                <Timer className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. APR</p>
                <p className="text-2xl font-bold">10.25%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staking Pools */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Pools</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stakingPools.map((pool) => (
            <StakingCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
    </div>
  );
}
