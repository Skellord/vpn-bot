import sql from '../database.mjs';

class TransactionService {
  async getTransactions() {
    const transactions = await sql`SELECT * FROM transactions`;
    return JSON.stringify(transactions);
  }

  async createTransaction(userId, amount) {
    const transaction = await sql`INSERT INTO subscribe_transactions (user_id, days_amount) VALUES (${userId}, ${amount}) RETURNING *`;

    return JSON.stringify(transaction);
  }
}

export default new TransactionService();
