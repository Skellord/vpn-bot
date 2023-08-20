import sql from '../database.mjs';
import { checkUserPeer } from '../service/peerService.mjs';

export async function handleCreateTransaction(req, res) {
  const { userId, amount } = req.body;

  try {
    const [transaction] = await sql`INSERT INTO subscribe_transactions (user_id, days_amount) VALUES (${userId}, ${amount}) RETURNING *`;

    res.end(JSON.stringify(transaction));
    setTimeout(checkUserPeer, 5000, userId);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};
