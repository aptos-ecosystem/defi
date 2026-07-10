export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  price: number;
  priceChange24h: number;
  balance?: string;
}

export interface StakingPool {
  id: string;
  name: string;
  tokenSymbol: string;
  apr: number;
  tvl: number;
  stakedAmount: string;
  earnedRewards: string;
  lockupPeriod: number;
  rewardToken: string;
}

export interface Transaction {
  id: string;
  type: 'swap' | 'stake' | 'unstake' | 'approve' | 'claim';
  status: 'pending' | 'confirmed' | 'failed';
  hash: string;
  timestamp: number;
  amount: string;
  token: string;
}

export const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', address: '0x0000000000000000000000000000000000000000', decimals: 18, price: 2345.67, priceChange24h: 2.45, balance: '1.5' },
  { symbol: 'USDC', name: 'USD Coin', address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', decimals: 6, price: 1.00, priceChange24h: 0.01, balance: '5000.00' },
  { symbol: 'USDT', name: 'Tether', address: '0xdac17f958d2ee523a2206206994597c13d831ec7', decimals: 6, price: 1.00, priceChange24h: -0.02, balance: '2500.00' },
  { symbol: 'DAI', name: 'Dai', address: '0x6b175474e89094c44da98b954eedeac495271d0f', decimals: 18, price: 1.00, priceChange24h: 0.00, balance: '1000.00' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', decimals: 8, price: 43250.00, priceChange24h: -1.23, balance: '0.05' },
  { symbol: 'LINK', name: 'Chainlink', address: '0x514910771af9ca656af840dff83e8264ecf986ca', decimals: 18, price: 14.56, priceChange24h: 5.67, balance: '100.00' },
  { symbol: 'UNI', name: 'Uniswap', address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', decimals: 18, price: 7.89, priceChange24h: -2.34, balance: '50.00' },
  { symbol: 'AAVE', name: 'Aave', address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', decimals: 18, price: 98.45, priceChange24h: 3.21, balance: '10.00' },
];

export const stakingPools: StakingPool[] = [
  { id: '1', name: 'ETH Staking', tokenSymbol: 'ETH', apr: 4.5, tvl: 125000000, stakedAmount: '0.75', earnedRewards: '0.0034', lockupPeriod: 0, rewardToken: 'ETH' },
  { id: '2', name: 'USDC Vault', tokenSymbol: 'USDC', apr: 8.2, tvl: 89000000, stakedAmount: '2500', earnedRewards: '17.45', lockupPeriod: 7, rewardToken: 'USDC' },
  { id: '3', name: 'LINK Staking', tokenSymbol: 'LINK', apr: 12.5, tvl: 34000000, stakedAmount: '50', earnedRewards: '0.52', lockupPeriod: 14, rewardToken: 'LINK' },
  { id: '4', name: 'UNI Pool', tokenSymbol: 'UNI', apr: 15.8, tvl: 28000000, stakedAmount: '0', earnedRewards: '0', lockupPeriod: 30, rewardToken: 'UNI' },
];

export const recentTransactions: Transaction[] = [
  { id: '1', type: 'swap', status: 'confirmed', hash: '0x1234...5678', timestamp: Date.now() - 300000, amount: '0.5', token: 'ETH' },
  { id: '2', type: 'stake', status: 'confirmed', hash: '0x2345...6789', timestamp: Date.now() - 600000, amount: '1000', token: 'USDC' },
  { id: '3', type: 'claim', status: 'pending', hash: '0x3456...7890', timestamp: Date.now() - 60000, amount: '5.23', token: 'LINK' },
  { id: '4', type: 'swap', status: 'failed', hash: '0x4567...8901', timestamp: Date.now() - 900000, amount: '100', token: 'DAI' },
];

export const portfolioData = {
  totalValue: 15234.56,
  change24h: 3.45,
  changeValue: 507.23,
  allocation: [
    { token: 'ETH', value: 7500, percentage: 49.2 },
    { token: 'USDC', value: 5000, percentage: 32.8 },
    { token: 'LINK', value: 1456, percentage: 9.6 },
    { token: 'UNI', value: 789, percentage: 5.2 },
    { token: 'Other', value: 489, percentage: 3.2 },
  ],
};

export const priceHistory = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  price: 2000 + Math.random() * 500 + i * 10,
}));
