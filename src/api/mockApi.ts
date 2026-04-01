import { Transaction, initialMockData } from '../data/mockData';

const STORAGE_KEY = 'finance_dashboard_transactions';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredData = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockData));
  return initialMockData;
};

const setStoredData = (data: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const mockApi = {
  fetchTransactions: async (): Promise<Transaction[]> => {
    await delay(1000); // simulate network latency
    return getStoredData().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  
  addTransaction: async (txn: Omit<Transaction, 'id'>): Promise<Transaction> => {
    await delay(600);
    const newTxn: Transaction = {
      ...txn,
      id: `txn_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
    };
    const current = getStoredData();
    setStoredData([...current, newTxn]);
    return newTxn;
  },
  
  updateTransaction: async (id: string, updates: Partial<Omit<Transaction, 'id'>>): Promise<Transaction> => {
    await delay(500);
    const current = getStoredData();
    const index = current.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Transaction not found");
    
    const updatedTxn = { ...current[index], ...updates };
    current[index] = updatedTxn;
    setStoredData(current);
    return updatedTxn;
  },
  
  deleteTransaction: async (id: string): Promise<void> => {
    await delay(500);
    const current = getStoredData();
    const filtered = current.filter(t => t.id !== id);
    setStoredData(filtered);
  }
};
