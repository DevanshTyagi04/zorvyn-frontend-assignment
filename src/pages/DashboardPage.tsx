import { OverviewCards } from '../components/dashboard/OverviewCards';
import { DashboardCharts } from '../components/dashboard/Charts';

export function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Finance Overview</h1>
        <p className="text-muted mt-1 text-sm">Monitor your income, expenses, and track your financial health.</p>
      </header>
      <OverviewCards />
      <DashboardCharts />
    </div>
  );
}
