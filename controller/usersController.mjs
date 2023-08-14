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

export async function getUser(req, res) {
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
