import { handleCreateUser, handleGetUser } from './controller/usersController.mjs';
import { handleCreateTransaction } from './controller/transactionsController.mjs';
import { handleGetPeerConf, handleGetPeerImage } from './controller/peersController.mjs';
import { GET, PEERS, POST, TRANSACTIONS, USERS } from './const.mjs';

function noResponse(_, res) {
  res.writeHead(404);
  res.end('Not Found');
}

export const router = {
  [`${GET}${USERS}`]: handleGetUser,
  [`${POST}${USERS}`]: handleCreateUser,
  [`${POST}${TRANSACTIONS}`]: handleCreateTransaction,
  [`${GET}${PEERS}/image`]: handleGetPeerImage,
  [`${GET}${PEERS}/conf`]: handleGetPeerConf,
  ['default']: noResponse,
};
