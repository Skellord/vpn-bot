import http from 'node:http';
import { URL } from 'node:url';
import { router } from './router.mjs';
import peerService from './service/peerService.mjs';
import countPeerDirs from './utils/countPeerDirs.mjs';
import fillPeers from './utils/fillPeers.mjs';
import { getBody } from './utils/getBody.mjs';

const BASE_URL = 'http://localhost:5000';

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
  let reqUrl = new URL(req.url, BASE_URL);
  const requestListener = router[req.method + reqUrl.pathname] ?? router.default;

  const reqBody = await getBody(req);
  req.body = reqBody ? JSON.parse(reqBody) : null;

  const params = Object.fromEntries(reqUrl.searchParams.entries());
  req.params = params;

  res.setHeader('Content-Type', 'application/json');
  requestListener(req, res, reqUrl);
});


server.listen(5000, () => {
  console.log('Server listened 5000');
})
