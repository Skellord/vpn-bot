import sql from '../database.mjs';

class UserService {
  async getUsers() {
    const users = await sql`SELECT * FROM users`;

    return JSON.stringify(users);
  }

  async createUser(id, username) {
    const newUser = await sql`INSERT INTO users (id, username) VALUES (${id}, ${username}) RETURNING *`;

    return JSON.stringify(newUser);
  }

  async updateUserSubscription(id, days) {
    const updatedUser = await sql`UPDATE users SET subscription = ${days} WHERE id = ${id}`;

    return JSON.stringify(updatedUser);
  }
}

export default new UserService();
