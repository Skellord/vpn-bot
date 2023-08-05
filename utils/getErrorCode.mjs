export const getErrorCode = (errorMessage) => {
  if (errorMessage.includes('Bad')) {
    return 400;
  }

  return 500;
}
