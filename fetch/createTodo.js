import { API_URL } from '@/constants';

const createTodo = async ({ title }) => {
  if (!title) throw new Error('title is required');
  await fetch(`${API_URL}/todos?title=${encodeURIComponent(title)}`, {
    method: 'POST',
  });
};

export default createTodo;
