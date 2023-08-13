import { GET, POST, PUT } from '../const.mjs';
import peerService from '../service/peerService.mjs';
import userService from '../service/userService.mjs';
import { Controller } from './controller.mjs';
import { Buffer } from 'node:buffer';

class PeersController extends Controller {
  async init(req, res) {
    await this.setBody(req);
    this.setParams(req);

    switch (req.method) {
      case GET:
        if (this.params.type === 'image' && this.params.userId) {
          const user = await userService.getUser(this.params.userId);

          if (user.peer_id) {
            await peerService.getPeerImg(user.peer_id, res);
            // const image = Buffer.from(imageBuffer, 'utf-8').toString('base64');
            // res.setHeader('Content-Type', 'image/png');
            // res.end(image);
          }
        }
        break;

      default:
        throw new Error('Bad Request');
        break;
    }
  }
}

export default new PeersController;
