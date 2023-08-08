import { GET, POST, PUT } from '../const.mjs';
import transactionService from '../service/transactionService.mjs';
import usersService from '../service/userService.mjs';
import getBody from '../utils/getBody.mjs';
import { Controller } from './controller.mjs';

class UsersController extends Controller {
  async init(req, res) {
    await this.setBody(req);
    this.setParams(req);

    console.log(this.body);

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
        res.end(userTransaction);
        break;
      default:
        throw new Error('Bad Request, not GET or POST');
    }
  }
}

export default new UsersController;
