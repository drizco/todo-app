import { API_URL } from '@/constants';
import createTodo from '@/fetch/createTodo';

describe('createTodo', () => {
  let title;
  beforeEach(() => {
    fetch.resetMocks();
    title = 'New todo';
  });
  it('creates a todo', async () => {
    await createTodo({ title });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(`${API_URL}/todos?title=${encodeURIComponent(title)}`, {
      method: 'POST',
    });
  });

  it('rejects if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    await expect(createTodo({ title })).rejects.toEqual('API no worky...');
  });

  it('throws an error if no title is passed', async () => {
    await expect(createTodo({})).rejects.toThrowError('title is required');
  });
});
