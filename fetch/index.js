import { API_URL } from '@/constants';

export const getAllTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const getTodo = async ({ id }) => {
  const response = await fetch(`${API_URL}/todos/${id}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const createTodo = async ({ title }) => {
  const response = await fetch(`${API_URL}/todos?title=${encodeURIComponent(title)}`, {
    method: 'POST',
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const getItems = async ({ id }) => {
  const response = await fetch(`${API_URL}/todos/${id}/items`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const createItem = async ({ id, title }) => {
  const response = await fetch(
    `${API_URL}/todos/${id}/items?title=${encodeURIComponent(title)}`,
    {
      method: 'POST',
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};
