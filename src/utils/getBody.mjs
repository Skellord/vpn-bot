export const getBody = async (req) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  await new Promise((resolve, reject) => {
    req.on('end', () => {
      resolve();
    });

    req.on('error', (error) => {
      reject(error);
    });
  });

  return body;
}
