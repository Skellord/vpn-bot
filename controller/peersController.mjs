import { readFile } from 'node:fs/promises';

import { getUser } from '../service/userService.mjs';

export async function getPeerImage(req, res) {
  const { userId } = req.body;

  try {
    const user = await getUser(userId);
    const id = user.peer_id;

    if (id) {
      const filePath = new URL(`../wireguard/peer${id}/peer${id}.png`, import.meta.url);
      const data = await readFile(filePath);
      res.setHeader('Content-Type', 'image/png');
      res.end(data);
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};
