import sql from '../database.mjs';

export async function getTransactions() {
  const transactions = await sql`SELECT * FROM transactions`;
  return JSON.stringify(transactions);
};

