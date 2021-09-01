import { API_URL } from '@/constants';

// GET
export const getAllTodos = async () => {
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

export const getTodo = async ({ id }) => {
  try {
    if (!id) throw new Error('id is required');
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return null;
  }
};

export const getItems = async ({ id }) => {
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

// POST
export const createTodo = async ({ title }) => {
  if (!title) throw new Error('title is required');
  await fetch(`${API_URL}/todos?title=${encodeURIComponent(title)}`, {
    method: 'POST',
  });
};

export const createItem = async ({ id, title }) => {
  if (!title) throw new Error('title is required');
  if (!id) throw new Error('id is required');
  await fetch(`${API_URL}/todos/${id}/items?title=${encodeURIComponent(title)}`, {
    method: 'POST',
  });
};

// DELETE
export const deleteTodo = async ({ id }) => {
  if (!id) throw new Error('id is required');
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
};

export const deleteItem = async ({ todoId, itemId }) => {
  if (!todoId) throw new Error('todo id is required');
  if (!itemId) throw new Error('item id is required');
  await fetch(`${API_URL}/todos/${todoId}/items/${itemId}`, {
    method: 'DELETE',
  });
};

// UPDATE
export const updateItem = async ({ todoId, itemId, completed }) => {
  if (!todoId) throw new Error('todo id is required');
  if (!itemId) throw new Error('item id is required');
  await fetch(`${API_URL}/todos/${todoId}/items/${itemId}?completed=${completed}`, {
    method: 'PATCH',
  });
};
