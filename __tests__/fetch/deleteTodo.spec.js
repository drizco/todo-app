import deleteTodo from '@/fetch/deleteTodo';
import { API_URL } from '@/constants';

describe('deleteTodo', () => {
  let id;
  beforeEach(() => {
    fetch.resetMocks();
    id = 1;
  });

  it('deletes a todo', async () => {
    await deleteTodo({ id });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  });

  it('rejects if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    await expect(deleteTodo({ id })).rejects.toEqual('API no worky...');
  });

  it('throws an error if no id is passed', async () => {
    await expect(deleteTodo({})).rejects.toThrowError('id is required');
  });
});
