export function getCurrentTime() {
  return new Date().toISOString().replace(/[-T:]/g, '_').slice(0, 19);
};
