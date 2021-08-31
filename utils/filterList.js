const filterList = ({ items, term }) =>
  items.filter(({ title }) => new RegExp(term, 'i').test(title));

export default filterList;
