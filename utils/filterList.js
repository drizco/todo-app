export const escapeString = (string) => {
  if (typeof string !== 'string') {
    throw new Error('Expected a string');
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
};

const filterList = ({ items, term }) => {
  if (!term) {
    return items;
  }
  return items.filter(({ title }) => new RegExp(escapeString(term), 'i').test(title));
};

export default filterList;
