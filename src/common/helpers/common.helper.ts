import { ApiResponseOptions } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

/**
 * This will be used to help swagger display all the possible error codes for
 * a specific endpoint.
 * @param errorCodeObject
 */
export const mapErrors = (
  errorCodeObject: { code: string; message: string }[],
): ApiResponseOptions => {
  let descriptionString = 'Possible error codes: ';

  errorCodeObject.map((item) => {
    descriptionString += `${item.code} , `;
  });

  return { description: descriptionString };
};

export const comparePasswords = async (
  customerPassword: string,
  currentPassword: string,
): Promise<boolean> => {
  return await bcrypt.compareSync(customerPassword, currentPassword);
};
