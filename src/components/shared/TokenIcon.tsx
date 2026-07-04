import { cn } from "@/lib/utils";

interface TokenIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const tokenColors: Record<string, string> = {
  ETH: 'from-blue-400 to-blue-600',
  WETH: 'from-blue-400 to-blue-600',
  USDC: 'from-blue-500 to-blue-700',
  USDT: 'from-green-400 to-green-600',
  DAI: 'from-yellow-400 to-yellow-600',
  WBTC: 'from-orange-400 to-orange-600',
  MATIC: 'from-purple-400 to-purple-600',
  BNB: 'from-yellow-400 to-yellow-500',
  LINK: 'from-blue-400 to-blue-500',
  UNI: 'from-pink-400 to-pink-600',
  AAVE: 'from-cyan-400 to-purple-500',
};

const sizeClasses = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
};

export function TokenIcon({ symbol, size = 'md', className }: TokenIconProps) {
  const gradient = tokenColors[symbol] || 'from-primary to-accent';
  
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-foreground bg-gradient-to-br shadow-md",
        gradient,
        sizeClasses[size],
        className
      )}
    >
      {symbol.slice(0, 2)}
    </div>
  );
}
