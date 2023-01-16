/**
 * Generates a "random" alphanumeric code
 *
 * For a 7 chars length, we have a universe of +338 millions available codes.
 *
 * @param codeLength the generated code length. The default length is 7.
 * @returns string
 */
export const readableCodeGeneration = (codeLength = 7): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let code = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
};
