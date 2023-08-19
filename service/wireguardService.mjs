import { copyFile, readdir, constants, readFile, writeFile } from 'node:fs/promises';
import { upOne } from 'docker-compose/dist/v2.js';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

import { getArrayFromEnvVariables, getCurrentTime } from '../utils/index.mjs';

const WIREGUARD = 'wireguard';
const UTF_8 = 'utf-8';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = dirname(currentFilePath);

const directoryPath = resolve(currentDirectoryPath, `../${WIREGUARD}`);
const filePath = join(directoryPath, `${WIREGUARD}-variables.env`);

const controller = new AbortController();
const { signal } = controller;

export async function recreateWireguard() {
  try {
    await upOne(
      WIREGUARD,
      {
        cwd: directoryPath,
        detach: true,
        log: true,
        commandOptions: ['--force-recreate'],
      },
    );
  } catch (err) {
    console.error(err);
  }
};

async function reserveCopy() {
  const tempDir = join(directoryPath, 'temp');

  try {
    console.log('Copying file...');
    const fileName = join(tempDir, `${getCurrentTime()}.env`)
    await copyFile(filePath, fileName, constants.COPYFILE_EXCL);
    console.log('File copied');
  } catch (err) {
    console.error(err);
  }
};

export async function addWireguardPeer(name) {
  try {
    await reserveCopy();

    console.log('Adding peer...');
    const data = await readFile(filePath, { signal, encoding: UTF_8 });
    const addedNames = getArrayFromEnvVariables(data);

    if (addedNames.includes(name)) {
      console.log('Peer name already exists');
      return;
    }

    console.log('Change env variables...');
    const newNames = [...addedNames, name];
    const newEnvData = `PEERS=${newNames.join(',')}`;
    const writePromise = writeFile(filePath, newEnvData, { signal, encoding: UTF_8 });
    await writePromise;
    console.log('Peer added');
  } catch (err) {
    console.error(err);
  }
};

export async function deleteWireguardPeer(name) {
  try {
    await reserveCopy();

    console.log('Deleting peer...');
    const data = await readFile(filePath, { signal, encoding: UTF_8 });
    const addedNames = getArrayFromEnvVariables(data);

    if (!addedNames.includes(name)) {
      console.log('Peer name not found');
      return;
    }

    console.log('Change env variables...');
    const newNames = addedNames.filter((item) => item !== name);
    const newEnvData = `PEERS=${newNames.join(',')}`;
    const writePromise = writeFile(filePath, newEnvData, { signal, encoding: UTF_8 });
    await writePromise;
    console.log('Peer deleted');
  } catch (err) {
    console.error(err);
  }
};
