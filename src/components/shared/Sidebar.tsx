import { LayoutDashboard, PieChart, ReceiptText } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { activePage, setActivePage } = useFinanceStore();

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'insights', label: 'Insights', icon: PieChart },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
  ] as const;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 border-r border-border bg-card/50 hidden md:flex md:flex-col fixed pt-16 h-screen overflow-y-auto">
        <div className="flex-1 px-4 py-8 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 shadow-sm border border-primary-500/10" 
                    : "text-muted hover:bg-muted/50 hover:text-text border border-transparent"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 w-full h-16 bg-card border-t border-border z-40 flex items-center justify-around px-2 pb-safe">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-primary-600 dark:text-primary-400" : "text-muted hover:text-text"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </>
  );
}
