import { createUser, getUsers } from './controller/usersController.mjs';
import { createTransaction } from './controller/transactionsController.mjs';
import { getPeerImage } from './controller/peersController.mjs';
import { GET, PEERS, POST, TRANSACTIONS, USERS } from './const.mjs';

function noResponse(_, res) {
  res.writeHead(404);
  res.end('Not Found');
}

export const router = {
  [`${GET}${USERS}`]: getUsers,
  [`${POST}${USERS}`]: createUser,
  [`${POST}${TRANSACTIONS}`]: createTransaction,
  [`${GET}${PEERS}/image`]: getPeerImage,
  ['default']: noResponse,
};
