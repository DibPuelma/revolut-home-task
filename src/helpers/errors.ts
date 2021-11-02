// eslint-disable-next-line import/prefer-default-export
export const handleError = (
  error: unknown,
  setError: undefined | ((error: string) => void) = undefined,
): string => {
  let message = '';
  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  }
  if (setError) setError(message);
  return message;
};
