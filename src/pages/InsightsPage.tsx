import { InsightCards } from '../components/insights/InsightCards';

export function InsightsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Intelligent Insights</h1>
        <p className="text-muted mt-1 text-sm">Review algorithms suggesting where to save and how to optimize your cash flow.</p>
      </header>
      <InsightCards />
    </div>
  );
}
