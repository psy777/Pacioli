import React from 'react';

export interface LedgerEntry {
  id: string | number;
  date: string | Date;
  description: string;
  account: string;
  debit?: number | string;
  credit?: number | string;
}

export interface LedgerProps {
  entries: LedgerEntry[];
  title?: string;
}

export function Ledger({ entries, title = 'General Ledger' }: LedgerProps) {
  const formatCurrency = (amount?: number | string) => {
    if (amount === undefined || amount === null || amount === '') return '-';
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pacioli-card" style={{ overflowX: 'auto' }}>
      <h2 className="pacioli-title">{title}</h2>
      <div className="pacioli-table-wrapper">
        <table className="pacioli-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Account</th>
              <th style={{ textAlign: 'right' }}>Debit</th>
              <th style={{ textAlign: 'right' }}>Credit</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--pacioli-text-muted)' }}>
                  No entries found
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatDate(entry.date)}</td>
                  <td>{entry.description}</td>
                  <td>
                    <span className="pacioli-badge pacioli-badge-success">{entry.account}</span>
                  </td>
                  <td style={{ textAlign: 'right' }} className="pacioli-amount-debit">
                    {entry.debit ? formatCurrency(entry.debit) : ''}
                  </td>
                  <td style={{ textAlign: 'right' }} className="pacioli-amount-credit">
                    {entry.credit ? formatCurrency(entry.credit) : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
