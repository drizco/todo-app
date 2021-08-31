import filterList from '@/utils/filterList';

describe('filterList', () => {
  let items;
  let term;

  beforeEach(() => {
    items = [
      { title: 'test' },
      { title: 'test number two' },
      { title: 'another todo' },
      { title: 'FINAL TEST' },
    ];
    term = 'test';
  });

  it('filters an array of objects by title given a search term', () => {
    const result = filterList({ items, term });
    expect(result).toHaveLength(3);

    term = 'number two';
    const secondResult = filterList({ items, term });
    expect(secondResult).toHaveLength(1);
  });

  it('filters regardless of search term or title casing', () => {
    term = 'FinAl';
    const result = filterList({ items, term });
    expect(result).toHaveLength(1);
  });

  it('returns the original array if not given a search term', () => {
    const result = filterList({ items });
    expect(result).toHaveLength(4);
  });
});
