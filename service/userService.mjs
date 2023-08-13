import sql from '../database.mjs';


export async function getUsers(_, res) {
  try {
    const users = await sql`SELECT * FROM users`;

    res.end(JSON.stringify(users));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};

export async function getUser(id) {
  const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

  return user;
};

export async function getU(req, res) {
  try {
    const { id } = req.params;
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
    console.log(user)
    res.end(JSON.stringify(user));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};

export async function createUser(req, res) {
  const { id, username } = req.body;

  try {
    const newUser = await sql`INSERT INTO users (id, username) VALUES (${id}, ${username}) RETURNING *`;
    res.end(JSON.stringify(newUser));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }

};

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

  return JSON.stringify(user);
};

export async function checkUserPeer(id) {
  const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

  return user.peer_id;
};
