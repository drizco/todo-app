import { API_URL } from '@/constants';
import deleteItem from '@/fetch/deleteItem';

describe('deleteItem', () => {
  let todoId;
  let itemId;
  beforeEach(() => {
    fetch.resetMocks();
    todoId = 1;
    itemId = 1;
  });

  it('deletes an item', async () => {
    await deleteItem({ todoId, itemId });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(`${API_URL}/todos/${todoId}/items/${itemId}`, {
      method: 'DELETE',
    });
  });

  it('rejects if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    await expect(deleteItem({ todoId, itemId })).rejects.toEqual('API no worky...');
  });

  it('throws an error if no todo id is passed', async () => {
    await expect(deleteItem({ itemId })).rejects.toThrowError('todo id is required');
  });

  it('throws an error if no item id is passed', async () => {
    await expect(deleteItem({ todoId })).rejects.toThrowError('item id is required');
  });
});
