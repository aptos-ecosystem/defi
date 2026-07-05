import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, Settings, ChevronDown, Loader2, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TokenIcon } from '@/components/shared/TokenIcon';
import { tokens, Token } from '@/data/mock-data';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SwapCard() {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState<Token>(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [showTokenSelect, setShowTokenSelect] = useState<'from' | 'to' | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toAmount = fromAmount 
    ? ((parseFloat(fromAmount) * fromToken.price) / toToken.price).toFixed(6) 
    : '';

  const priceImpact = parseFloat(fromAmount) > 100 ? 0.12 : 0.05;
  const gasEstimate = 0.005;

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    setShowConfirm(true);
  };

  const confirmSwap = async () => {
    setIsSwapping(true);
    setShowConfirm(false);
    
    // Simulate swap
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSwapping(false);
    toast.success(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
    setFromAmount('');
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const selectToken = (token: Token) => {
    if (showTokenSelect === 'from') {
      if (token.symbol === toToken.symbol) {
        setToToken(fromToken);
      }
      setFromToken(token);
    } else {
      if (token.symbol === fromToken.symbol) {
        setFromToken(toToken);
      }
      setToToken(token);
    }
    setShowTokenSelect(null);
  };

  return (
    <>
      <Card variant="glass" className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="gradient-text">Swap</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-xl"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-xl bg-secondary/50 mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Slippage Tolerance</p>
                  <div className="flex gap-2">
                    {[0.1, 0.5, 1.0].map((value) => (
                      <Button
                        key={value}
                        variant={slippage === value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSlippage(value)}
                      >
                        {value}%
                      </Button>
                    ))}
                    <Input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                      className="w-20 text-center"
                      placeholder="Custom"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* From Token */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-sm text-muted-foreground">
                Balance: {fromToken.balance} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-secondary"
                onClick={() => setShowTokenSelect('from')}
              >
                <TokenIcon symbol={fromToken.symbol} size="sm" />
                <span className="font-medium">{fromToken.symbol}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="text-right text-2xl font-mono bg-transparent border-none focus-visible:ring-0"
              />
            </div>
            <div className="flex justify-between mt-2">
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-primary"
                onClick={() => setFromAmount(fromToken.balance || '0')}
              >
                Max
              </Button>
              <span className="text-sm text-muted-foreground">
                ≈ ${(parseFloat(fromAmount || '0') * fromToken.price).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-1 relative z-10">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={switchTokens}
              className="p-2 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <ArrowDownUp className="h-5 w-5 text-primary" />
            </motion.button>
          </div>

          {/* To Token */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="text-sm text-muted-foreground">
                Balance: {toToken.balance} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-secondary"
                onClick={() => setShowTokenSelect('to')}
              >
                <TokenIcon symbol={toToken.symbol} size="sm" />
                <span className="font-medium">{toToken.symbol}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="text-right text-2xl font-mono bg-transparent border-none focus-visible:ring-0"
              />
            </div>
            <div className="text-right mt-2">
              <span className="text-sm text-muted-foreground">
                ≈ ${(parseFloat(toAmount || '0') * toToken.price).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Price Info */}
          {fromAmount && parseFloat(fromAmount) > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-secondary/20 space-y-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-mono">
                  1 {fromToken.symbol} = {(fromToken.price / toToken.price).toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={priceImpact > 0.1 ? 'text-warning' : 'text-success'}>
                  {priceImpact}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Gas</span>
                <span className="font-mono">{gasEstimate} ETH</span>
              </div>
            </motion.div>
          )}

          {/* Swap Button */}
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={handleSwap}
            disabled={isSwapping || !fromAmount}
          >
            {isSwapping ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Swapping...
              </>
            ) : (
              'Swap'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Token Select Modal */}
      <Dialog open={showTokenSelect !== null} onOpenChange={() => setShowTokenSelect(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Select Token</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => selectToken(token)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <TokenIcon symbol={token.symbol} />
                <div className="flex-1 text-left">
                  <p className="font-medium">{token.symbol}</p>
                  <p className="text-sm text-muted-foreground">{token.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono">{token.balance}</p>
                  <p className="text-sm text-muted-foreground">
                    ${(parseFloat(token.balance || '0') * token.price).toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Swap Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Swap</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <TokenIcon symbol={fromToken.symbol} />
                <span className="font-mono text-lg">{fromAmount}</span>
              </div>
              <span className="font-medium">{fromToken.symbol}</span>
            </div>
            <div className="flex justify-center">
              <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <TokenIcon symbol={toToken.symbol} />
                <span className="font-mono text-lg">{toAmount}</span>
              </div>
              <span className="font-medium">{toToken.symbol}</span>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 flex gap-2">
              <AlertCircle className="h-5 w-5 text-warning shrink-0" />
              <p className="text-sm text-warning">
                Output is estimated. You will receive at least {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken.symbol} or the transaction will revert.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Estimate</span>
                <span className="font-mono">{gasEstimate} ETH (~$11.73)</span>
              </div>
            </div>
            <Button variant="gradient" size="lg" className="w-full" onClick={confirmSwap}>
              <Check className="h-4 w-4" />
              Confirm Swap
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
