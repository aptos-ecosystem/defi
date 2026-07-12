import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'DeFi Hub',
  projectId: '21fef48091f12692cad574a6f7753643',
  chains: [mainnet, polygon, bsc],
});

export const supportedChains = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', icon: '⟠' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', icon: '⬡' },
  { id: 56, name: 'BNB Chain', symbol: 'BNB', icon: '◈' },
];
