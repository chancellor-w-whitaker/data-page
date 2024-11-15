export const getWords = (text) => {
  let x = text.replace(/[^A-Za-z0-9]+/g, " ");
  let newArr = x.trim().split(" ");
  return [...newArr.map((string) => string.toLowerCase())];
};
