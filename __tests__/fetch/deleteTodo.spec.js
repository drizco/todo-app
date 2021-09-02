import getItems from '@/fetch/getItems';
import deleteItem from '@/fetch/deleteItem';
import deleteTodo from '@/fetch/deleteTodo';
import { API_URL } from '@/constants';

jest.mock('@/fetch/getItems', () =>
  jest.fn().mockResolvedValue([
    { title: 'item 1', id: 1 },
    { title: 'item 2', id: 2 },
  ])
);
jest.mock('@/fetch/deleteItem', () => jest.fn().mockResolvedValue(null));

describe('deleteTodo', () => {
  let id;
  beforeEach(() => {
    fetch.resetMocks();
    id = 1;
  });

  it('deletes a todo', async () => {
    await deleteTodo({ id });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(getItems).toHaveBeenCalledTimes(1);
    expect(deleteItem).toHaveBeenCalledTimes(2);
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
