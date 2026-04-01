import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus, Edit2, Trash2, Search, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { Modal } from '../shared/Modal';
import { useFinanceStore } from '../../store/useFinanceStore';
import { TransactionForm } from './TransactionForm';
import { Transaction } from '../../data/mockData';

export function TransactionTable() {
  const { transactions, role, deleteTransaction } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState<Transaction | undefined>();

  const filteredData = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Date,Amount,Category,Type"].join(",") + "\n"
      + filteredData.map(t => `${t.id},${t.date},${t.amount},${t.category},${t.type}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openAddModal = () => {
    setEditingTxn(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (t: Transaction) => {
    setEditingTxn(t);
    setIsModalOpen(true);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
            <Input 
              placeholder="Search category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-48"
            />
          </div>
          <Select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-32"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <Button variant="outline" onClick={exportCSV} className="gap-2">
            <Upload className="w-4 h-4" /> Export
          </Button>
          {role === 'admin' && (
            <Button onClick={openAddModal} className="gap-2">
              <Plus className="w-4 h-4" /> Add New
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left align-middle border-collapse">
            <thead>
              <tr className="border-b border-border/50 text-muted">
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Type</th>
                <th className="py-3 px-4 font-medium text-right">Amount</th>
                {role === 'admin' && <th className="py-3 px-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredData.map(t => (
                  <tr key={t.id} className="border-b border-border/10 hover:bg-muted/5 transition-colors group">
                    <td className="py-3 px-4 text-muted">
                      {format(parseISO(t.date), 'MMM dd, yyyy h:mm a')}
                    </td>
                    <td className="py-3 px-4 font-medium">{t.category}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        t.type === 'income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">
                      ₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    {role === 'admin' && (
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-500 hover:bg-primary-50" onClick={() => openEditModal(t)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:bg-danger/10" onClick={() => deleteTransaction(t.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingTxn ? "Edit Transaction" : "Adding Record"}
      >
        <TransactionForm 
          txnToEdit={editingTxn} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </Card>
  );
}
