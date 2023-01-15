/**
 * Generates a "random" alphanumeric code
 * @param codeLength the generated code length. The default length is 7
 * @returns string
 */
export const generation = (codeLength = process.env.CODE_LENGTH || 7) => {
  const alphabet =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let code = '';
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }

  return code;
};
