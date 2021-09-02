import { API_URL } from '@/constants';

const getItems = async ({ id }) => {
  try {
    if (!id) throw new Error('id is required');
    const response = await fetch(`${API_URL}/todos/${id}/items`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return null;
  }
};

export default getItems;
