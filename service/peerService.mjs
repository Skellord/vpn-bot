import sql from '../database.mjs';

class PeerService {
  async getPeers() {
    const peers = await sql`SELECT * FROM peers`;

    return JSON.stringify(peers);
  }
}

export default new PeerService();
