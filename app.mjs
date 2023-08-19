import http from 'node:http';
import { URL } from 'node:url';
import 'dotenv/config';

import { router } from './router.mjs';
import { getBody } from './utils/getBody.mjs';
import { PORT, HOST } from './const.mjs';
import { deleteWireguardPeer } from './service/wireguardService.mjs';

const BASE_URL = `${HOST}:${PORT}`;

try {
  await deleteWireguardPeer('test5');
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


server.listen(PORT, () => {
  console.log(`Server listened ${BASE_URL}`);
})
