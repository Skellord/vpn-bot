const getBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
}

export default getBody;
