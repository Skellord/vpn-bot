const getParams = (requestUrl, hostName) => {
  const url = new URL(requestUrl, `http://${hostName}`);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  return queryParams;
}

export default getParams;
