export const insert = ({ element, into, here }) => [
  ...into.slice(0, here),
  element,
  ...into.slice(here),
];
