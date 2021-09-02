import { API_URL } from '@/constants';
import createItem from '@/fetch/createItem';

describe('createItem', () => {
  let title;
  let id;
  beforeEach(() => {
    fetch.resetMocks();
    title = 'New item';
    id = 1;
  });
  it('creates a todo item', async () => {
    await createItem({ id, title });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(
      `${API_URL}/todos/${id}/items?title=${encodeURIComponent(title)}`,
      { method: 'POST' }
    );
  });

  it('rejects if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    await expect(createItem({ id, title })).rejects.toEqual('API no worky...');
  });

  it('throws an error if no title is passed', async () => {
    await expect(createItem({ id })).rejects.toThrowError('title is required');
  });
  it('throws an error if no id is passed', async () => {
    await expect(createItem({ title })).rejects.toThrowError('id is required');
  });
});
