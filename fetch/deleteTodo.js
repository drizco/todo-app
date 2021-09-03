import { API_URL } from '@/constants';

const deleteTodo = async ({ id }) => {
  if (!id) throw new Error('id is required');
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
};

export default deleteTodo;
