// eslint-disable-next-line import/prefer-default-export
export const handleError = (error: unknown, setError: (error: string) => void) => {
  if (typeof error === 'string') {
    setError(error);
  } else if (error instanceof Error) {
    setError(error.message);
  }
};
