import { Sparkles, TrendingUp, AlertCircle, TrendingDown, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { useFinanceStore } from '../../store/useFinanceStore';

export function InsightCards() {
  const { transactions } = useFinanceStore();

  if (transactions.length === 0) return null;

  // Calculate insights
  const expenses = transactions.filter(t => t.type === 'expense');
  const catTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const highestCategory = Object.keys(catTotals).length > 0 
    ? Object.keys(catTotals).reduce((a, b) => catTotals[a] > catTotals[b] ? a : b) 
    : 'None';

  const incomeFlow = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expenseFlow = expenses.reduce((a, b) => a + b.amount, 0);
  const flowPercent = incomeFlow ? Math.round((expenseFlow / incomeFlow) * 100) : 100;
  
  const savingsRate = incomeFlow ? Math.round(((incomeFlow - expenseFlow) / incomeFlow) * 100) : 0;
  
  const largestExpense = expenses.length > 0 
    ? expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
    : null;

  // Calculate unique days with transactions to determine average daily spend
  const uniqueExpenseDays = new Set(expenses.map(t => t.date.split('T')[0])).size;
  const avgDailySpend = uniqueExpenseDays ? Math.round(expenseFlow / uniqueExpenseDays) : 0;

  return (
    <Card className="mt-6 bg-gradient-to-br from-primary-500/5 to-purple-500/5 border-primary-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Intelligent Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border transition-colors hover:bg-muted/5">
          <div className="p-2 bg-danger/10 rounded-full text-danger shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Top Spending Category</h4>
            <p className="text-sm text-muted mt-1">
              You spent the most on <strong className="text-text">{highestCategory}</strong>. Focus on reducing costs here to save more this month.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border transition-colors hover:bg-muted/5">
          <div className="p-2 bg-primary-500/10 rounded-full text-primary-500 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Savings Rate</h4>
            <p className="text-sm text-muted mt-1">
              You are saving <strong className={savingsRate > 20 ? "text-success" : "text-danger"}>{savingsRate}%</strong> of your income. {savingsRate > 20 ? 'Great job hitting standard savings goals!' : 'Try to push this above 20% for optimal financial health.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border transition-colors hover:bg-muted/5">
          <div className="p-2 bg-success/10 rounded-full text-success shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Cash Flow Health</h4>
            <p className="text-sm text-muted mt-1">
              Your expenses consume <strong className="text-text">{flowPercent}%</strong> of your income. A ratio below 80% is recommended.
            </p>
          </div>
        </div>

        {largestExpense && (
          <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border transition-colors hover:bg-muted/5">
            <div className="p-2 bg-orange-500/10 rounded-full text-orange-500 shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Largest Single Expense</h4>
              <p className="text-sm text-muted mt-1">
                A single charge of <strong className="text-text">₹{largestExpense.amount.toLocaleString()}</strong> for {largestExpense.category} on {new Date(largestExpense.date).toLocaleDateString()} significantly impacted your budget.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border transition-colors hover:bg-muted/5">
          <div className="p-2 bg-purple-500/10 rounded-full text-purple-500 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Average Daily Spend</h4>
            <p className="text-sm text-muted mt-1">
              You are spending an average of <strong className="text-text">₹{avgDailySpend.toLocaleString()}</strong> per active day. Keeping this number low stretches your budget!
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
