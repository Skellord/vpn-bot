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
    const newSubscription = await sql`UPDATE users SET subscription = ${days} WHERE id = ${id} RETURNING *`;
    const user = await this.checkUserPeer(id);

    return JSON.stringify(newSubscription);
  }

  async setUserPeer(id, peerId) {
    const [user] = await sql.begin(async sql => {
      const [peer] = await sql`UPDATE peers SET is_allowed = false WHERE id = ${peerId}`;
      const [user] = await sql`UPDATE users SET peer_id = ${peerId} WHERE id = ${id}`;

      return [user, peer];
    })

    return JSON.stringify(user);
  }

  async checkUserPeer(id) {
    const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;

    return user.peer_id;
  }
}

export default new UserService();
