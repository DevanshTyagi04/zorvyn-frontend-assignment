import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { useFinanceStore } from '../../store/useFinanceStore';

export function OverviewCards() {
  const { transactions, isLoading } = useFinanceStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse h-32"></Card>
        ))}
      </div>
    );
  }

  const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const total = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted">Total Balance</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{income.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted">Total Expense</CardTitle>
          <TrendingDown className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        </CardContent>
      </Card>
    </div>
  );
}
