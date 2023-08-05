import { GET, POST } from '../const.mjs';
import usersService from '../service/userService.mjs';
import getBody from '../utils/getBody.mjs';

class UsersController {
  async init(req, res) {
    switch (req.method) {
      case GET:
        const users = await usersService.getUsers();
        res.end(users);
        break;
      case POST:
        const body = await getBody(req);

        if (!body) {
          throw new Error('Bad Request, no body');
        }

        if (!body.id || !body.username) {
          throw new Error('Bad Request, no id or username');
        }

        const newUser = await usersService.createUser(body.id, body.username);
        res.end(newUser);
        break;
      default:
        throw new Error('Bad Request, not GET or POST');
    }
  }
}

export default new UsersController;
