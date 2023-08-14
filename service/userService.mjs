import sql from '../database.mjs';
import { checkFreePeer } from './peerService.mjs';


export async function updateUserSubscription(id, days) {
  const newSubscription = await sql`UPDATE users SET subscription = ${days} WHERE id = ${id} RETURNING *`;
  const user = await this.checkUserPeer(id);

  return JSON.stringify(newSubscription);
};

export async function setUserPeer(id, peerId) {
  const [user] = await sql.begin(async sql => {
    const [peer] = await sql`UPDATE peers SET is_allowed = false WHERE id = ${peerId}`;
    const [user] = await sql`UPDATE users SET peer_id = ${peerId} WHERE id = ${id}`;

    return [user, peer];
  })

  return user;
};

export async function checkUserPeer(id) {
  const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

  return user.peer_id;
};

export async function updateUserPeer(userId) {
  const userPeerId = await checkUserPeer(userId);

  if (!userPeerId) {
    const freePeer = await checkFreePeer();

    if (freePeer) {
      await setUserPeer(userId, freePeer.id);
    }
  }
};

export async function getUser(id) {
  try {
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}
