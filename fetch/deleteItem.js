import { API_URL } from '@/constants';

const deleteItem = async ({ todoId, itemId }) => {
  if (!todoId) throw new Error('todo id is required');
  if (!itemId) throw new Error('item id is required');
  await fetch(`${API_URL}/todos/${todoId}/items/${itemId}`, {
    method: 'DELETE',
  });
};

export default deleteItem;
