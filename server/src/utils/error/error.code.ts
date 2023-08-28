export type ErrorCodeType = {
  errorCode: string;
  message: string;
};

export const ErrorCodes = {
  INCORRECT_CREDENTIALS: {
    errorCode: 'INCORRECT_CREDENTIALS',
    message: 'bad',
  },
  EMAIL_ALREADY_IN_USE: {
    errorCode: 'EMAIL_ALREADY_IN_USE',
    message: 'repeatable',
  },
  FORBIDDEN: {
    errorCode: 'FORBIDDEN',
    message: 'forbidden',
  },
  UNAUTHENTICATED: {
    errorCode: 'UNAUTHENTICATED',
    message: 'unauthorized',
  },
};
