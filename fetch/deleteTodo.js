import getItems from '@/fetch/getItems';
import deleteItem from '@/fetch/deleteItem';
import { API_URL } from '@/constants';

const deleteTodo = async ({ id }) => {
  if (!id) throw new Error('id is required');
  const items = await getItems({ id });
  const promiseArray = items.map((item) => deleteItem({ todoId: id, itemId: item.id }));
  await Promise.all([
    fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    }),
    ...promiseArray,
  ]);
};

export default deleteTodo;
