import http from 'node:http';
import router from './router.mjs';
import peerService from './service/peerService.mjs';
import countPeerDirs from './utils/countPeerDirs.mjs';
import fillPeers from './utils/fillPeers.mjs';

// try {
//   const filePath = new URL('./wireguard/peer1/peer1.conf', import.meta.url);
//   const data = await readFile(filePath, { encoding: 'utf-8' });
//   console.log(data);
// } catch (err) {
//   console.error(err.message);
// }

try {
  const dbPeers = await peerService.getPeers();
  const dbPeersLength = JSON.parse(dbPeers)?.length;

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
} catch (err) {
  console.error(err.message);
}


const server = http.createServer(async (req, res) => {
  router.requestListener(req, res);
});


server.listen(5000, () => {
  console.log('Server listened 5000');
})
