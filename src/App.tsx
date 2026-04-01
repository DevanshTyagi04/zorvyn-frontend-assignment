import { useEffect } from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { Sidebar } from './components/shared/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { InsightsPage } from './pages/InsightsPage';

function App() {
  const { fetchTransactions, theme, role, setRole, toggleTheme, isLoading, activePage } = useFinanceStore();

  useEffect(() => {
    // Initialize theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Initial fetch
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-200 flex flex-col">
      <header className="fixed top-0 w-full h-16 border-b border-border bg-card/80 backdrop-blur-md z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">FinDash</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            className="bg-card text-text border border-border overflow-hidden rounded-md px-2 py-1.5 md:px-3 text-xs md:text-sm outline-none focus:ring-2 focus:ring-primary-500 min-w-[100px] cursor-pointer"
          >
            <option value="viewer" className="bg-card text-text py-1">Viewer Role</option>
            <option value="admin" className="bg-card text-text py-1">Admin Role</option>
          </select>
          
          <button 
            onClick={toggleTheme}
            className="p-2 border border-border rounded-full hover:bg-muted/10 transition-colors flex-shrink-0"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        {/* Main Content Area: Offset padding for desktop sidebar md:ml-64, and mobile bottom nav pb-24 */}
        <main className="flex-1 md:ml-64 px-4 md:px-8 py-8 pb-24 md:pb-12 max-w-7xl mx-auto w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              {activePage === 'dashboard' && <DashboardPage />}
              {activePage === 'transactions' && <TransactionsPage />}
              {activePage === 'insights' && <InsightsPage />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
