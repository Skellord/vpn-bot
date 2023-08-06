import getBody from '../utils/getBody.mjs';
import getParams from '../utils/getParams.mjs';

export class Controller {
  constructor() {
    this.body = null;
    this.params = null;
  }

  async setBody(req) {
    const body = await getBody(req);

    if (Object.keys(body).length > 0) {
      this.body = JSON.parse(body);
    }
  }

  setParams(req) {
    const params = getParams(req.url, req.headers.host);

    this.params = params;
  }
};
