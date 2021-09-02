import { API_URL } from '@/constants';
import getTodo from '@/fetch/getTodo';

describe('getTodo', () => {
  let id;
  beforeEach(() => {
    fetch.resetMocks();
    id = 1;
  });
  it('fetches a todo from the api by id', async () => {
    fetch.mockResponseOnce(JSON.stringify({ title: 'First todo' }));
    const todo = await getTodo({ id });
    expect(todo).toBeDefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(`${API_URL}/todos/${id}`);
  });

  it('returns null if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    const todo = await getTodo({ id });
    expect(todo).toBeNull();
  });
});
