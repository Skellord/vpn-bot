import http from 'node:http';
import { URL } from 'node:url';

import { router } from './router.mjs';
import { updatePeers } from './service/peerService.mjs';
import { getBody } from './utils/getBody.mjs';

const BASE_URL = 'http://localhost:5000';

try {
  await updatePeers();
} catch (err) {
  console.error(err);
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
