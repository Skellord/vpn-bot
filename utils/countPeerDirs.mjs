import { readdir } from 'node:fs/promises';

const countPeerDirs = async () => {
  let count = 0;
  const files = await readdir('./wireguard');

  for (const file of files) {
    if (file.includes('peer')) {
      count++;
    }
  }

  return count;
};

export default countPeerDirs;
