import { API_URL } from '@/constants';

const updateItem = async ({ todoId, itemId, completed }) => {
  if (!todoId) throw new Error('todo id is required');
  if (!itemId) throw new Error('item id is required');
  if (completed == null) throw new Error('completed boolean is required');
  await fetch(`${API_URL}/todos/${todoId}/items/${itemId}?completed=${completed}`, {
    method: 'PATCH',
  });
};

export default updateItem;
