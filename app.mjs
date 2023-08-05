import http from 'node:http';
import router from './router.mjs';

// try {
//   const filePath = new URL('./wireguard/peer1/peer1.conf', import.meta.url);
//   const data = await readFile(filePath, { encoding: 'utf-8' });
//   console.log(data);
// } catch (err) {
//   console.error(err.message);
// }

// const countPeerDirs = async () => {
//   let count = 0;
//   const files = await readdir('./wireguard');

//   for (const file of files) {
//     if (file.includes('peer')) {
//       count++;
//     }
//   }

//   return count;
// }

// const fillPeers = async () => {
//   const peersCount = await countPeerDirs();

//   const inserts = Array.from({ length: peersCount }, (_, i) => {
//     return sql`INSERT INTO peers (peer_id, is_allowed) VALUES (${i + 1}, true)`;
//   });

//   await Promise.all(inserts);
// }

// await fillPeers();


const server = http.createServer(async (req, res) => {
  router.requestListener(req, res);
});


server.listen(5000, () => {
  console.log('Server listened 5000');
})
