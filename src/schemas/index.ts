import { pgTable, serial, text, numeric, timestamp, integer } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'asset', 'liability', 'equity', 'revenue', 'expense'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  description: text('description').notNull(),
  referenceId: text('reference_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const journalEntries = pgTable('journal_entries', {
  id: serial('id').primaryKey(),
  transactionId: integer('transaction_id')
    .references(() => transactions.id)
    .notNull(),
  accountId: integer('account_id')
    .references(() => accounts.id)
    .notNull(),
  type: text('type').notNull(), // 'debit' or 'credit'
  amount: numeric('amount', { precision: 14, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
