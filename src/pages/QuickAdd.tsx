import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Save, Tag, DollarSign } from 'lucide-react';
import { saveTransaction } from '../services/googleSheets';

export default function QuickAdd() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    type: (searchParams.get('type') as 'Pengeluaran' | 'Pemasukan') || 'Pengeluaran',
    amount: searchParams.get('amount') || ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Unified submission handler
  const processSubmission = async (name: string, type: string, amount: string) => {
    if (!name || !amount) return;

    setLoading(true);
    const result = await saveTransaction({
      date: new Date().toISOString(),
      name: name,
      type: type as 'Pengeluaran' | 'Pemasukan',
      amount: Number(amount)
    });

    setLoading(false);
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', type: 'Pengeluaran', amount: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processSubmission(formData.name, formData.type, formData.amount);
  };

  // Auto-submit functionality
  useEffect(() => {
    const auto = searchParams.get('auto');
    const name = searchParams.get('name');
    const amount = searchParams.get('amount');
    const type = searchParams.get('type') || 'Pengeluaran';

    if (auto === 'true' && name && amount) {
      processSubmission(name, type, amount);
    }
  }, []); // Run once on mount

  return (
    <Layout title="Quick Quick">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Type Selection */}
        <div className="flex gap-4">
          <label className={`flex-1 cursor-pointer border-2 border-retro-black p-3 rounded-retro text-center font-bold transition-all
            ${formData.type === 'Pengeluaran' ? 'bg-retro-pink shadow-retro' : 'bg-white shadow-retro-sm opacity-60 hover:opacity-100'}`}>
            <input 
              type="radio" 
              name="type" 
              value="Pengeluaran" 
              checked={formData.type === 'Pengeluaran'}
              onChange={(e) => setFormData({...formData, type: e.target.value as 'Pengeluaran' | 'Pemasukan'})}
              className="hidden"
            />
            EXPENSE
          </label>
          <label className={`flex-1 cursor-pointer border-2 border-retro-black p-3 rounded-retro text-center font-bold transition-all
            ${formData.type === 'Pemasukan' ? 'bg-green-200 shadow-retro' : 'bg-white shadow-retro-sm opacity-60 hover:opacity-100'}`}>
            <input 
              type="radio" 
              name="type" 
              value="Pemasukan" 
              checked={formData.type === 'Pemasukan'}
              onChange={(e) => setFormData({...formData, type: e.target.value as 'Pengeluaran' | 'Pemasukan'})}
              className="hidden"
            />
            INCOME
          </label>
        </div>

        {/* Name Input */}
        <div className="relative group">
          <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-retro-black">
            <Tag size={20} />
          </div>
          <input
            type="text"
            placeholder="What for?"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="input-retro pl-12"
            disabled={loading}
          />
        </div>

        {/* Amount Input */}
        <div className="relative group">
          <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-retro-black">
            <DollarSign size={20} />
          </div>
          <input
            type="number"
            placeholder="How much?"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="input-retro pl-12 text-lg font-bold"
            disabled={loading}
          />
        </div>

        {/* Status Message */}
        {status === 'success' && (
          <div className="bg-green-100 border-2 border-retro-black p-2 text-center text-green-800 font-bold text-xs animate-bounce">
            SAVED SUCCESSFULLY!
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="btn-retro w-full flex items-center justify-center gap-2 mt-4 bg-retro-black text-white hover:bg-gray-800 active:bg-black"
        >
          {loading ? 'SAVING...' : (
            <>
              <Save size={18} />
              SAVE RECORD
            </>
          )}
        </button>

        {/* View Report Link */}
        <div className="text-center mt-2">
          <a href="/report" className="text-sm font-bold text-gray-500 hover:text-retro-black underline decoration-2 underline-offset-4">
            VIEW EXPENSE REPORT →
          </a>
        </div>
      </form>
    </Layout>
  );
}
