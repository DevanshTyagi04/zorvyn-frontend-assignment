import { create } from 'zustand';
import { Transaction } from '../data/mockData';
import { mockApi } from '../api/mockApi';

export type Role = 'viewer' | 'admin';
export type Page = 'dashboard' | 'transactions' | 'insights';

interface FinanceState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  role: Role;
  theme: 'light' | 'dark';
  activePage: Page;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  addTransaction: (txn: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  
  setRole: (role: Role) => void;
  toggleTheme: () => void;
  setActivePage: (page: Page) => void;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  role: 'admin', // default for demo
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  activePage: 'dashboard',

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await mockApi.fetchTransactions();
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch transactions', isLoading: false });
    }
  },

  addTransaction: async (txn) => {
    try {
      const newTxn = await mockApi.addTransaction(txn);
      set(state => ({
        transactions: [newTxn, ...state.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }));
    } catch (err) {
      set({ error: 'Failed to add transaction' });
    }
  },

  updateTransaction: async (id, updates) => {
    try {
      const updatedTxn = await mockApi.updateTransaction(id, updates);
      set(state => ({
        transactions: state.transactions.map(t => t.id === id ? updatedTxn : t).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }));
    } catch (err) {
      set({ error: 'Failed to update transaction' });
    }
  },

  deleteTransaction: async (id) => {
    try {
      await mockApi.deleteTransaction(id);
      set(state => ({
        transactions: state.transactions.filter(t => t.id !== id)
      }));
    } catch (err) {
      set({ error: 'Failed to delete transaction' });
    }
  },

  setRole: (role) => set({ role }),
  setActivePage: (page) => set({ activePage: page }),

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', next);
    set({ theme: next });
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}));
