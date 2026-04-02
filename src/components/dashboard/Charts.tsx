import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { useFinanceStore } from '../../store/useFinanceStore';
import { format, parseISO } from 'date-fns';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'];

export function DashboardCharts() {
  const { transactions, isLoading } = useFinanceStore();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="animate-pulse h-80"></Card>
        <Card className="animate-pulse h-80"></Card>
      </div>
    );
  }

  // Process data for category Donut Chart
  const categoryDataRaw = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, txn) => {
      const idx = acc.findIndex(i => i.name === txn.category);
      if (idx >= 0) {
        acc[idx].value += txn.amount;
      } else {
        acc.push({ name: txn.category, value: txn.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value);

  const totalExpense = categoryDataRaw.reduce((sum, item) => sum + item.value, 0);
  const categoryData = categoryDataRaw.map(item => ({
    ...item,
    percent: totalExpense > 0 ? Math.round((item.value / totalExpense) * 100) : 0
  }));

  // Generate history data for the last 7 days of activity
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Generate history data for the last 7 days of activity
  const historyRaw = sortedTransactions.reduce((acc, txn) => {
    const day = format(parseISO(txn.date), 'MMM dd');
    if (!acc[day]) acc[day] = { name: day, income: 0, expense: 0, balance: 0 };
    if (txn.type === 'income') acc[day].income += txn.amount;
    else acc[day].expense += txn.amount;
    return acc;
  }, {} as Record<string, any>);
  
  const historyData = Object.values(historyRaw).slice(-7);

  // Generate Cumulative Balance Trend
  let cumulativeBalance = 0;
  const balanceTrendData = sortedTransactions.map(txn => {
    cumulativeBalance += txn.type === 'income' ? txn.amount : -txn.amount;
    return {
      date: format(parseISO(txn.date), 'MMM dd'),
      balance: cumulativeBalance
    };
  });
  
  // Reduce balance trend to one point per day
  const dailyBalanceTrend = Object.values(balanceTrendData.reduce((acc, curr) => {
    acc[curr.date] = curr; // overwrites with the last balance of the day
    return acc;
  }, {} as Record<string, any>));

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm mt-4">
        {payload?.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-1.5 focus:outline-none">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-muted font-medium">{entry.payload.name}</span>
            <span className="font-bold text-text">{entry.payload.percent}%</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyBalanceTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `₹${val}`} />
              <Tooltip cursor={{stroke: 'var(--muted)', strokeWidth: 1}} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card)' }} />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expense (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-80 sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(val) => `₹${val}`} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card)' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-80 sm:h-[350px] flex justify-center items-center">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }} 
                  itemStyle={{ color: 'var(--text)' }} 
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-muted flex items-center justify-center h-full">No expense data available.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
