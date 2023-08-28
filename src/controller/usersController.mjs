import sql from '../database.mjs';

export async function handleGetUsers(_, res) {
  try {
    const users = await sql`SELECT * FROM users`;

    res.end(JSON.stringify(users));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};

export async function handleCreateUser(req, res) {
  try {
    const { id, username } = req.body;
    console.log(id, username);
    const [newUser] = await sql`INSERT INTO users (id, username) VALUES (${id}, ${username}) RETURNING *`;
    res.end(JSON.stringify(newUser));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};

export async function handleGetUser(req, res) {
  try {
    const { id } = req.params;
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
    res.end(JSON.stringify(user));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};
