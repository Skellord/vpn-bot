import { readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

import { getUser } from '../service/userService.mjs';

export async function handleGetPeerImage(req, res) {
  const { userId } = req.body;

  try {
    const user = await getUser(userId);
    const id = user.peer_id;

    if (id) {
      const filePath = new URL(`../wireguard/peer${id}/peer${id}.png`, import.meta.url);
      const data = await readFile(filePath);
      res.setHeader('Content-Type', 'image/png');
      res.end(data);
    } else {
      res.end("User's peer not found");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};

export async function handleGetPeerConf(req, res) {
  const { userId } = req.body;

  try {
    const user = await getUser(userId);
    const id = user.peer_id;

    if (id) {
      const filePath = new URL(`../wireguard/peer${id}/peer${id}.conf`, import.meta.url);
      const data = await readFile(filePath);
      res.setHeader('Content-Type', 'octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=peer.conf');
      res.end(data);
    } else {
      res.end("User's peer not found");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(err.message);
  }
};
