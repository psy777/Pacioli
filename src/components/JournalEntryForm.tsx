import React, { useState } from 'react';

export interface JournalEntryFormProps {
  accounts: { id: string | number; name: string }[];
  onSubmit: (data: {
    date: string;
    description: string;
    entries: { accountId: string | number; type: 'debit' | 'credit'; amount: number }[];
  }) => void | Promise<void>;
}

export function JournalEntryForm({ accounts, onSubmit }: JournalEntryFormProps) {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState<{ id: number; accountId: string; type: 'debit' | 'credit'; amount: string }[]>([
    { id: 1, accountId: '', type: 'debit', amount: '' },
    { id: 2, accountId: '', type: 'credit', amount: '' }
  ]);

  const addLine = () => {
    setEntries([...entries, { id: Date.now(), accountId: '', type: 'debit', amount: '' }]);
  };

  const updateLine = (id: number, field: string, value: string) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)));
  };

  const removeLine = (id: number) => {
    if (entries.length > 2) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedEntries = entries.map(entry => ({
      accountId: entry.accountId,
      type: entry.type as 'debit' | 'credit',
      amount: parseFloat(entry.amount) || 0
    })).filter(entry => entry.accountId && entry.amount > 0);
    
    onSubmit({
      date,
      description,
      entries: formattedEntries
    });
  };

  const totalDebits = entries.filter(e => e.type === 'debit').reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const totalCredits = entries.filter(e => e.type === 'credit').reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  const isBalanced = totalDebits === totalCredits && totalDebits > 0;

  return (
    <div className="pacioli-card">
      <h2 className="pacioli-title">New Journal Entry</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Date</label>
            <input 
              type="date" 
              className="pacioli-input" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              required 
            />
          </div>
          <div style={{ flex: '2 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Description</label>
            <input 
              type="text" 
              className="pacioli-input" 
              placeholder="e.g. Office Supplies Purchase" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="pacioli-table-wrapper">
          <table className="pacioli-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Dr / Cr</th>
                <th>Amount</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>
                    <select 
                      className="pacioli-input" 
                      value={entry.accountId}
                      onChange={e => updateLine(entry.id, 'accountId', e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Account</option>
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select 
                      className="pacioli-input" 
                      value={entry.type}
                      onChange={e => updateLine(entry.id, 'type', e.target.value)}
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </td>
                  <td>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0"
                      className="pacioli-input" 
                      placeholder="0.00" 
                      value={entry.amount}
                      onChange={e => updateLine(entry.id, 'amount', e.target.value)}
                      style={{ textAlign: 'right' }}
                      required
                    />
                  </td>
                  <td>
                    <button 
                      type="button" 
                      onClick={() => removeLine(entry.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--pacioli-danger)', cursor: 'pointer', opacity: entries.length > 2 ? 1 : 0.5 }}
                      disabled={entries.length <= 2}
                      aria-label="Remove line"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{ padding: '0.5rem' }}>
                  <button type="button" className="pacioli-btn" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--pacioli-surface)', border: '1px dashed var(--pacioli-border)' }} onClick={addLine}>
                    + Add Line
                  </button>
                </td>
              </tr>
              <tr style={{ backgroundColor: 'var(--pacioli-surface)' }}>
                <td colSpan={2} style={{ textAlign: 'right', fontWeight: 600, padding: '1rem' }}>Totals:</td>
                <td style={{ textAlign: 'right', fontWeight: 600, padding: '1rem', color: isBalanced ? 'var(--pacioli-success)' : 'var(--pacioli-danger)' }}>
                  Dr: {totalDebits.toFixed(2)} | Cr: {totalCredits.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
          {!isBalanced && (
            <span style={{ color: 'var(--pacioli-danger)', fontSize: '0.875rem', fontWeight: 500 }}>
              Debits and credits must balance!
            </span>
          )}
          <button type="submit" className="pacioli-btn pacioli-btn-primary" disabled={!isBalanced}>
            Record Entry
          </button>
        </div>
      </form>
    </div>
  );
}
