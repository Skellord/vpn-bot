// import usersController from './controller/usersController.mjs';
// import peersController from './controller/peersController.mjs';
import { API_URL, GET, PEERS, POST, USERS } from './const.mjs';
import { getErrorCode } from './utils/getErrorCode.mjs';
import { createUser, getU, getUser, getUsers } from './service/userService.mjs';

// class Router {
//   _setJSONHeader() {
//     this.res.setHeader('Content-Type', 'application/json');
//   }

//   _setTextHeader() {
//     this.res.setHeader('Content-Type', 'text/plain');
//   }

//   _setStatus(status) {
//     ;
//     this.res.writeHead(status);
//   }

//   _setError(code, error) {
//     this._setStatus(code ?? 500);
//     this.res.end(error ?? 'Internal Server Error');
//   }

//   async requestListener(req, res) {
//     this.req = req;
//     this.res = res;

//     try {
//       this._setJSONHeader();

//       switch (true) {
//         case USERS.test(req.url):
//           await usersController.init(req, res);
//           break;

//         case PEERS.test(req.url):
//           await peersController.init(req, res);
//           break;
//         default:
//           this._setTextHeader();
//           this._setStatus(404);
//           res.end('Not Found');
//       }
//     } catch (err) {
//       console.error(err);
//       const errCode = getErrorCode(err.message);
//       this._setError(errCode, err.message);
//     }
//   }
// }

// export default new Router();

function noResponse(_, res) {
  res.writeHead(404);
  res.end('Not Found');
}

export const router = {
  [`${GET}${USERS}`]: getUsers,
  [`${GET}${USERS}/user`]: getU,
  [`${POST}${USERS}`]: createUser,
  ['default']: noResponse,
};
