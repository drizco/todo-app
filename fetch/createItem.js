import { API_URL } from '@/constants';

const createItem = async ({ id, title }) => {
  if (!title) throw new Error('title is required');
  if (!id) throw new Error('id is required');
  await fetch(`${API_URL}/todos/${id}/items?title=${encodeURIComponent(title)}`, {
    method: 'POST',
  });
};

export default createItem;
