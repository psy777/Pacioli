import React from 'react';

export interface AccountSummaryProps {
  accountName: string;
  accountType: string;
  balance: number;
  currency?: string;
}

export function AccountSummary({ accountName, accountType, balance, currency = 'USD' }: AccountSummaryProps) {
  const isPositive = balance >= 0;
  
  // Normal balance rules: Assets/Expenses are debit normal (positive is good)
  // Liabilities/Equity/Revenue are credit normal (positive is good, but shown according to accounting standards)
  
  const formattedBalance = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency 
  }).format(Math.abs(balance));

  return (
    <div className="pacioli-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 className="pacioli-title" style={{ marginBottom: '0.25rem' }}>{accountName}</h3>
          <span className="pacioli-subtitle">{accountType}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--pacioli-primary)',
          color: 'white',
          opacity: 0.1
        }}>
          {/* Subtle icon placeholder */}
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          letterSpacing: '-0.025em',
          color: isPositive ? 'var(--pacioli-text)' : 'var(--pacioli-danger)'
        }}>
          {balance < 0 ? '-' : ''}{formattedBalance}
        </div>
      </div>
    </div>
  );
}
