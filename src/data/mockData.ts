export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // ISO string
  amount: number;
  category: string;
  type: TransactionType;
}

export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
  expense: ['Food', 'Rent', 'Travel', 'Utilities', 'Entertainment', 'Shopping', 'Other']
};

export const initialMockData: Transaction[] = [
  { id: 'txn_1', date: '2024-03-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'income' },
  { id: 'txn_2', date: '2024-03-02T12:30:00Z', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 'txn_3', date: '2024-03-05T18:45:00Z', amount: 120, category: 'Food', type: 'expense' },
  { id: 'txn_4', date: '2024-03-08T09:15:00Z', amount: 300, category: 'Utilities', type: 'expense' },
  { id: 'txn_5', date: '2024-03-12T14:20:00Z', amount: 800, category: 'Freelance', type: 'income' },
  { id: 'txn_6', date: '2024-03-15T20:00:00Z', amount: 250, category: 'Entertainment', type: 'expense' },
  { id: 'txn_7', date: '2024-03-18T16:10:00Z', amount: 60, category: 'Travel', type: 'expense' },
  { id: 'txn_8', date: '2024-03-22T19:30:00Z', amount: 450, category: 'Shopping', type: 'expense' },
  { id: 'txn_9', date: '2024-03-25T11:00:00Z', amount: 100, category: 'Gift', type: 'income' },
  { id: 'txn_10', date: '2024-03-28T08:00:00Z', amount: 85, category: 'Food', type: 'expense' },
  { id: 'txn_11', date: '2024-04-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'income' },
  { id: 'txn_12', date: '2024-04-02T13:20:00Z', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 'txn_13', date: '2024-04-04T19:10:00Z', amount: 200, category: 'Food', type: 'expense' }
];
