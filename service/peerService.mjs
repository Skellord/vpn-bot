import sql from '../database.mjs';
import { readFile, readdir } from 'node:fs/promises';

async function getPeers() {
  try {
    const peers = await sql`SELECT * FROM peers`;

    return peers;
  } catch (err) {
    console.error(err);
    return [];
  }
};

async function countPeerDirs() {
  let count = 0;
  const dirPath = new URL('../wireguard', import.meta.url);
  const files = await readdir(dirPath);

  for (const file of files) {
    if (file.includes('peer')) {
      count++;
    }
  }

  return count;
};

async function fillPeers(peersCount) {
  const inserts = Array.from({ length: peersCount }, (_, i) => {
    return sql`INSERT INTO peers (peer_id, is_allowed) VALUES (${i + 1}, true)`;
  });

  await Promise.all(inserts);
}

export async function updatePeers() {
  const dbPeers = await getPeers();
  const dbPeersLength = dbPeers?.length;

  if (dbPeersLength === 0) {
    console.log('Setting up peers');
    const peersCount = await countPeerDirs();

    if (peersCount) {
      await fillPeers(peersCount);
      console.log('Peers filled');
    } else {
      console.error('No peer dirs found');
    }
  }
}

export async function checkFreePeer() {
  const [freePeer] = await sql`SELECT * FROM peers WHERE is_allowed = true LIMIT 1`;

  return freePeer;
}
