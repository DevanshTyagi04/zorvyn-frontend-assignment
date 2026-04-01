import { TransactionTable } from '../components/transactions/TransactionTable';

export function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Transactions Hub</h1>
        <p className="text-muted mt-1 text-sm">Search, filter, and modify your transaction records.</p>
      </header>
      <div className="-mt-6">
        <TransactionTable />
      </div>
    </div>
  );
}
