import { readdir } from 'node:fs/promises';

const countPeerDirs = async () => {
  let count = 0;
  const dirPath = new URL('../wireguard', import.meta.url);
  const files = await readdir(dirPath);

  for (const file of files) {
    if (file.includes('peer')) {
      count++;
    }
  }

  return count;
};

export default countPeerDirs;
