import { API_URL } from '@/constants';
import updateItem from '@/fetch/updateItem';

describe('updateItem', () => {
  let todoId;
  let itemId;
  let completed;
  beforeEach(() => {
    fetch.resetMocks();
    todoId = 1;
    itemId = 1;
    completed = true;
  });

  it('updates an item', async () => {
    await updateItem({ todoId, itemId, completed });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith(
      `${API_URL}/todos/${todoId}/items/${itemId}?completed=${completed}`,
      {
        method: 'PATCH',
      }
    );
  });

  it('rejects if the api fails', async () => {
    fetch.mockReject(() => Promise.reject('API no worky...'));
    await expect(updateItem({ todoId, itemId, completed })).rejects.toEqual(
      'API no worky...'
    );
  });

  it('throws an error if no todo id is passed', async () => {
    await expect(updateItem({ itemId, completed })).rejects.toThrowError(
      'todo id is required'
    );
  });

  it('throws an error if no item id is passed', async () => {
    await expect(updateItem({ todoId, completed })).rejects.toThrowError(
      'item id is required'
    );
  });

  it('throws an error if no completed argument is passed', async () => {
    await expect(updateItem({ todoId, itemId })).rejects.toThrowError(
      'completed boolean is required'
    );
  });
});
