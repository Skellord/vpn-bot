export function getArrayFromEnvVariables(envData) {
  return envData.slice(6).trim().replace(/[']+/g, '').split(',');
};
