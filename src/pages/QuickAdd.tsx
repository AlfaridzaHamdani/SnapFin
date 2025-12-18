import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Save, Tag, DollarSign } from 'lucide-react';
import { saveTransaction } from '../services/googleSheets';

export default function QuickAdd() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Pengeluaran',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    setLoading(true);
    // Convert 'Pengeluaran' | 'Pemasukan' to match expected type if strictly needed,
    // here we just pass the string.
    const result = await saveTransaction({
      date: new Date().toISOString(),
      name: formData.name,
      type: formData.type as 'Pengeluaran' | 'Pemasukan',
      amount: Number(formData.amount)
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
              onChange={(e) => setFormData({...formData, type: e.target.value})}
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
              onChange={(e) => setFormData({...formData, type: e.target.value})}
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

      </form>
    </Layout>
  );
}
