export const _401 = {
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'The credentials are not valid',
  },
  ACCESS_DENIED: {
    code: 'ACCESS_DENIED',
    message:
      'You are not allowed to do this operation nor access this endpoint',
  },
};

export const _403 = {
  CUSTOMER_EXISTS_ALREADY: {
    code: 'CUSTOMER_EXISTS_ALREADY',
    message: 'This means that the customer already exists',
  },
};

export const _404 = {
  NO_CUSTOMER_FOUND: {
    code: 'NO_CUSTOMER_FOUND',
    message: 'This means that the customer does not exists',
  },
  NO_WALLET_FOUND: {
    code: 'NO_WALLET_FOUND',
    message: 'This means that the wallet does not exists',
  },
  NO_SOURCE_WALLET_FOUND: {
    code: 'NO_SOURCE_WALLET_FOUND',
    message: 'This means that the source wallet does not exists',
  },
  NO_DESTINATION_WALLET_FOUND: {
    code: 'NO_DESTINATION_WALLET_FOUND',
    message: 'This means that the destination wallet does not exists',
  },
  INSUFFICIENT_AMOUNT: {
    code: 'INSUFFICIENT_AMOUNT',
    message: 'Insufficient funds in source wallet',
  },
  ERROR_SAVING_TRANSACTION: {
    code: 'ERROR_SAVING_TRANSACTION',
    message: 'error while saving transaction',
  },
  NO_TRANSACTION_FOUND: {
    code: 'NO_TRANSACTION_FOUND',
    message: 'This means that the transaction does not exists',
  },
};

export const _500 = {
  DEFAULT_500: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'The service is currently not available',
  },
};
