import { createItem, createTodo, getAllTodos, getItems, getTodo } from '@/fetch';
import { API_URL } from '@/constants';
import { waitFor } from '@testing-library/react';

describe('fetching functions used to hit the backend api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  describe('GET functions', () => {
    describe('getAllTodos', () => {
      it('fetches all todos from the api', async () => {
        fetch.mockResponseOnce(
          JSON.stringify([{ title: 'First todo' }, { title: 'Second todo' }])
        );
        const todos = await getAllTodos();
        expect(todos).toHaveLength(2);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toBeCalledWith(`${API_URL}/todos`);
      });

      it('returns null if the api fails', async () => {
        fetch.mockReject(() => Promise.reject('API no worky...'));
        const todos = await getAllTodos();
        expect(todos).toBeNull();
      });
    });

    describe('getTodo', () => {
      let id;
      beforeEach(() => {
        id = 1;
      });
      it('fetches a todo from the api by id', async () => {
        fetch.mockResponseOnce(JSON.stringify({ title: 'First todo' }));
        const todo = await getTodo({ id });
        expect(todo).toBeDefined();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toBeCalledWith(`${API_URL}/todos/${id}`);
      });

      it('returns null if the api fails', async () => {
        fetch.mockReject(() => Promise.reject('API no worky...'));
        const todo = await getTodo({ id });
        expect(todo).toBeNull();
      });
    });

    describe('getItems', () => {
      let id;
      beforeEach(() => {
        id = 1;
      });
      it('fetches all items for a todo from the api', async () => {
        fetch.mockResponseOnce(
          JSON.stringify([{ title: 'First item' }, { title: 'Second item' }])
        );
        const items = await getItems({ id });
        expect(items).toHaveLength(2);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toBeCalledWith(`${API_URL}/todos/${id}/items`);
      });

      it('returns null if the api fails', async () => {
        fetch.mockReject(() => Promise.reject('API no worky...'));
        const items = await getItems({ id });
        expect(items).toBeNull();
      });

      it('returns null if no id is passed', async () => {
        const items = await getItems({});
        expect(items).toBeNull();
      });
    });
  });

  describe('POST functions', () => {
    describe('createTodo', () => {
      let title;
      beforeEach(() => {
        title = 'New todo';
      });
      it('creates a todo', async () => {
        await createTodo({ title });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toBeCalledWith(
          `${API_URL}/todos?title=${encodeURIComponent(title)}`,
          { method: 'POST' }
        );
      });

      it('rejects if the api fails', async () => {
        fetch.mockReject(() => Promise.reject('API no worky...'));
        await expect(createTodo({ title })).rejects.toEqual('API no worky...');
      });

      it('throws an error if no title is passed', async () => {
        await expect(createTodo({})).rejects.toThrowError('title is required');
      });
    });

    describe('createItem', () => {
      let title;
      let id;
      beforeEach(() => {
        title = 'New item';
        id = 1;
      });
      it('creates a todo item', async () => {
        await createItem({ id, title });
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toBeCalledWith(
          `${API_URL}/todos/${id}/items?title=${encodeURIComponent(title)}`,
          { method: 'POST' }
        );
      });

      it('rejects if the api fails', async () => {
        fetch.mockReject(() => Promise.reject('API no worky...'));
        await expect(createItem({ id, title })).rejects.toEqual('API no worky...');
      });

      it('throws an error if no title is passed', async () => {
        await expect(createItem({ id })).rejects.toThrowError('title is required');
      });
      it('throws an error if no id is passed', async () => {
        await expect(createItem({ title })).rejects.toThrowError('id is required');
      });
    });
  });
});
