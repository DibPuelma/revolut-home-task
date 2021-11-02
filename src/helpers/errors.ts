// eslint-disable-next-line import/prefer-default-export
export const handleError = (error: unknown, setError: (error: string) => void): string => {
  let message = '';
  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  }
  setError(message);
  return message;
};
