import sql from '../database.mjs';

const fillPeers = async (peersCount) => {
  const inserts = Array.from({ length: peersCount }, (_, i) => {
    return sql`INSERT INTO peers (peer_id, is_allowed) VALUES (${i + 1}, true)`;
  });

  await Promise.all(inserts);
};

export default fillPeers;
