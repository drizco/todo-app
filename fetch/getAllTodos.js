import { API_URL } from '@/constants';

const getAllTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return null;
  }
};

export default getAllTodos;
