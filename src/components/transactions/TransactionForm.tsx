import { useState } from 'react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { useFinanceStore } from '../../store/useFinanceStore';
import { CATEGORIES, Transaction } from '../../data/mockData';

interface Props {
  txnToEdit?: Transaction;
  onSuccess: () => void;
}

export function TransactionForm({ txnToEdit, onSuccess }: Props) {
  const { addTransaction, updateTransaction } = useFinanceStore();
  
  const [type, setType] = useState<'income' | 'expense'>(txnToEdit?.type || 'expense');
  const [amount, setAmount] = useState(txnToEdit?.amount.toString() || '');
  const [category, setCategory] = useState(txnToEdit?.category || CATEGORIES.expense[0]);
  const [date, setDate] = useState(txnToEdit ? txnToEdit.date.slice(0, 16) : new Date().toISOString().slice(0, 16));
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const payload = {
        type, 
        amount: parseFloat(amount), 
        category, 
        date: new Date(date).toISOString()
      };

      if (txnToEdit) {
        await updateTransaction(txnToEdit.id, payload);
      } else {
        await addTransaction(payload);
      }
      onSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block text-muted">Type</label>
        <Select value={type} onChange={(e) => {
          setType(e.target.value as any);
          setCategory(CATEGORIES[e.target.value as 'income' | 'expense'][0]);
        }} required>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-muted">Amount (₹)</label>
        <Input type="number" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block text-muted">Category</label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {CATEGORIES[type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block text-muted">Date</label>
        <Input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Saving...' : txnToEdit ? 'Update Transaction' : 'Save Transaction'}
      </Button>
    </form>
  );
}
