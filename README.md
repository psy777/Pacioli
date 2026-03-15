# Pacioli

A premium, themeable React component library and Drizzle ORM PostgreSQL schema set for building modern double-entry bookkeeping apps.

> **Pacioli** is an open-source library designed to bridge the gap between complex financial engineering and beautiful user interfaces. Named after Luca Pacioli, the father of accounting, this package provides everything you need to bootstrap a double-entry bookkeeping system in minutes.
> 
> Instead of building ledgers, journal entries, and balance validation from scratch, Pacioli gives you drop-in, highly-customizable React components that look fantastic out-of-the-box (with built-in dark mode). By bundling production-ready **Drizzle ORM schemas**, Pacioli ensures your UI is perfectly mapped to a robust PostgreSQL database architecture backing your financial data.

## Features

- **Components**: Pre-built financial UI components like `Ledger`, `JournalEntryForm`, and `AccountSummary`.
- **Theming**: Easily toggle between `'light'`, `'dark'`, and `'system'` themes. Extensively customizable via CSS variables.
- **Database Schemas**: Built-in Drizzle ORM schemas to tie your components instantly to your PostgreSQL database.

## Installation

```bash
npm install pacioli
```

Ensure you have the peer dependencies installed:
```bash
npm install react react-dom drizzle-orm
```

## Setup

First, wrap your application in the `PacioliProvider` to apply the themes.

```tsx
import { PacioliProvider, Ledger } from 'pacioli';
import 'pacioli/dist/index.css'; // Make sure to import the CSS styles!

function App() {
  return (
    <PacioliProvider theme="system">
      <Ledger 
        entries={[
          { id: '1', date: '2023-10-01', description: 'Initial Deposit', account: 'Cash', debit: 5000 },
          { id: '2', date: '2023-10-02', description: 'Office Supplies', account: 'Expenses', credit: 200 }
        ]}
      />
    </PacioliProvider>
  );
}
```

## Database Schema (Drizzle ORM)

We provide standard accounting tables out-of-the-box (`accounts`, `transactions`, `journalEntries`).

```ts
// schema.ts
export * from 'pacioli/schemas';
```

Use `drizzle-kit` to push or migrate these schemas to your database.
