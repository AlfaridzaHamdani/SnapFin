
import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../services/supabaseClient';
import { ArrowLeft, Loader, Receipt, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Transaction {
  id: number;
  created_at: string;
  name: string;
  type: 'Pengeluaran' | 'Pemasukan';
  amount: number;
  date: string;
}

export default function ExpenseReport() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const totalExpense = transactions
    .filter(t => t.type === 'Pengeluaran')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncome = transactions
    .filter(t => t.type === 'Pemasukan')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout title="Laporan Keuangan">
      <div className="flex flex-col gap-4">
        {/* Navigation Back */}
        <Link to="/quick-add" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black mb-2">
          <ArrowLeft size={16} />
          BACK TO ADD
        </Link>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border-2 border-retro-black p-3 bg-red-100 rounded-retro shadow-retro-sm">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <TrendingDown size={16} />
              <span className="text-xs font-bold uppercase">Expense</span>
            </div>
            <div className="font-bold text-lg leading-tight">{formatCurrency(totalExpense)}</div>
          </div>
          <div className="border-2 border-retro-black p-3 bg-green-100 rounded-retro shadow-retro-sm">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <TrendingUp size={16} />
              <span className="text-xs font-bold uppercase">Income</span>
            </div>
            <div className="font-bold text-lg leading-tight">{formatCurrency(totalIncome)}</div>
          </div>
        </div>

        {/* Balance */}
        <div className={`border-2 border-retro-black p-3 rounded-retro shadow-retro text-center
          ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
          <span className="text-xs font-bold uppercase block mb-1">Net Balance</span>
          <span className="font-black text-2xl tracking-tight">{formatCurrency(balance)}</span>
        </div>

        {/* Transactions List */}
        <div className="mt-2">
            <div className="flex items-center justify-between mb-3 border-b-2 border-retro-black pb-2">
                <h2 className="font-bold text-lg flex items-center gap-2">
                    <Receipt size={20} />
                    HISTORY
                </h2>
                <div className="text-xs font-bold bg-retro-black text-white px-2 py-1 rounded">
                    {transactions.length} ITEMS
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10 opacity-50">
                    <Loader className="animate-spin" size={32} />
                </div>
            ) : error ? (
                <div className="bg-red-200 border-2 border-black p-4 text-center font-bold text-red-800">
                    {error}
                </div>
            ) : transactions.length === 0 ? (
                <div className="text-center py-10 opacity-50 italic">
                    No transactions found.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {transactions.map((t) => (
                        <div key={t.id || t.created_at} className="bg-white border-2 border-retro-black p-3 rounded-retro shadow-retro-sm flex justify-between items-center group hover:translate-x-1 transition-transform">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-800">{t.name}</span>
                                <span className="text-xs text-gray-500 font-mono">{formatDate(t.date || t.created_at)}</span>
                            </div>
                            <div className={`font-bold font-mono text-lg
                                ${t.type === 'Pengeluaran' ? 'text-red-500' : 'text-green-500'}`}>
                                {t.type === 'Pengeluaran' ? '-' : '+'}{formatCurrency(t.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
}
