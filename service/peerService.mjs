import sql from '../database.mjs';
import { readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

class PeerService {
  async getPeers() {
    const peers = await sql`SELECT * FROM peers`;

    return JSON.stringify(peers);
  }

  async checkFreePeer() {
    const [freePeer] = await sql`SELECT * FROM peers WHERE is_allowed = true LIMIT 1`;

    return freePeer;
  }

  async getPeerImg(id, res) {
    const filePath = new URL(`../wireguard/peer${id}/peer${id}.png`, import.meta.url);
    const data = await readFile(filePath);

    res.setHeader('Content-Type', 'image/png');
    return res.end(data);
  }
}

export default new PeerService();
