import { getPeerName } from '../utils/getPeerName.mjs';
import { getUserSubscribeDays } from './userService.mjs';
import sql from '../database.mjs';
import { getAddedPeers, addWireguardPeer, recreateWireguard, deleteWireguardPeer } from './wireguardService.mjs';

export async function checkUserPeer(id) {
  const subDays = await getUserSubscribeDays(id);
  const peerName = getPeerName(id);
  const peerNames = await getAddedPeers();

  if (!Boolean(subDays)) {
    if (subDays === 0) {
      if (!peerNames.includes(peerName)) {
        console.log('Peer name already does not exist');
        return;
      }

      await deleteWireguardPeer(peerName);
      await recreateWireguard();
    }
  }

  if (peerNames.includes(peerName)) {
    console.log('Peer name already exists');
    return;
  }

  await addWireguardPeer(peerName);
  await recreateWireguard();
};

export async function syncPeers() {
  try {
    const users = await sql`SELECT * FROM users`;
    await Promise.all(users.map((user) => checkUserPeer(user.id)));
  } catch (err) {
    console.error(err);
  }
};
