export const generateUniqueCode = (length: number) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let uniqueCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueCode += characters[randomIndex];
  }

  return uniqueCode;
};
