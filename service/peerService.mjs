import sql from '../database.mjs';

class PeerService {
  async getPeers() {
    const peers = await sql`SELECT * FROM peers`;

    return JSON.stringify(peers);
  }

  async checkFreePeer() {
    const [freePeer] = await sql`SELECT * FROM peers WHERE is_allowed = true LIMIT 1`;

    return freePeer;
  }
}

export default new PeerService();
