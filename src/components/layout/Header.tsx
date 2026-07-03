import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ArrowLeftRight, Coins, LayoutDashboard, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/swap', label: 'Swap', icon: ArrowLeftRight },
  { path: '/stake', label: 'Stake', icon: Coins },
  { path: '/portfolio', label: 'Portfolio', icon: Wallet },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                <span className="text-lg font-bold text-primary">P</span>
              </div>
            </div>
            <span className="text-xl font-bold">
              <span className="text-primary">ProsperaFi</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={cn(
                      "relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors",
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="gradient" size="lg" onClick={handleAuthAction}>
            {user ? (
              <>
                <LogOut className="h-4 w-4" />
                Sign Out
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
