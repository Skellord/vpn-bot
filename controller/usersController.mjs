import { GET, POST, PUT } from '../const.mjs';
import peerService from '../service/peerService.mjs';
import transactionService from '../service/transactionService.mjs';
import userService from '../service/userService.mjs';
import usersService from '../service/userService.mjs';
import { Controller } from './controller.mjs';

class UsersController extends Controller {
  async init(req, res) {
    await this.setBody(req);
    this.setParams(req);

    switch (req.method) {
      case GET:
        const users = await usersService.getUsers();
        res.end(users);
        break;
      case POST:
        if (!this.body) {
          throw new Error('Bad Request, no body');
        }

        if (!this.body.id || !this.body.username) {

          throw new Error('Bad Request, no id or username');
        }

        const newUser = await usersService.createUser(this.body.id, this.body.username);
        res.end(newUser);
        break;
      case PUT:
        if (!this.params.id) {
          throw new Error('Bad Request, no id');
        }

        if (!this.body || !this.body.days) {
          throw new Error('Bad Request, no body');
        }

        const userTransaction = await transactionService.createTransaction(this.params.id, this.body.days);
        const isUserHasPeer = await userService.checkUserPeer(this.params.id);

        if (!isUserHasPeer) {
          const freePeer = await peerService.checkFreePeer();

          if (freePeer) {
            await userService.setUserPeer(this.params.id, freePeer.peer_id);
          } else {
            throw new Error('Bad Request, no free peer');
          }
        }

        res.end(userTransaction);
        break;
      default:
        throw new Error('Bad Request, not GET or POST or PUT');
    }
  }
}

export default new UsersController;
