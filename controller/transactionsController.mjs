import sql from '../database.mjs';
import { updateUserPeer } from '../service/userService.mjs';

export async function handleCreateTransaction(req, res) {
  const { userId, amount } = req.body;

  try {
    const [transaction] = await sql`INSERT INTO subscribe_transactions (user_id, days_amount) VALUES (${userId}, ${amount}) RETURNING *`;

    res.end(JSON.stringify(transaction));
    await updateUserPeer(userId);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};
