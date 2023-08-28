import { readFile } from 'node:fs/promises';

import { getPeerName } from '../utils/index.mjs';
import { WIREGUARD } from '../const.mjs';

export async function handleGetPeerImage(req, res) {
  try {
    const { userId } = req.params;

    if (userId) {
      const peerName = `peer_${getPeerName(userId)}`;
      const filePath = new URL(`../${WIREGUARD}/${WIREGUARD}/${peerName}/${peerName}.png`, import.meta.url);
      const data = await readFile(filePath);
      res.setHeader('Content-Type', 'image/png');
      res.end(data);
    } else {
      res.end("User's peer not found");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    res.end('Image not found');
  }
};

export async function handleGetPeerConf(req, res) {
  try {
    const { userId } = req.params;

    if (userId) {
      const peerName = `peer_${getPeerName(userId)}`;
      const filePath = new URL(`../${WIREGUARD}/${WIREGUARD}/${peerName}/${peerName}.conf`, import.meta.url);
      const data = await readFile(filePath);
      res.setHeader('Content-Type', 'octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=peer.conf');
      res.end(data);
    } else {
      res.end("User's peer not found");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    res.end('File not found');
  }
};
