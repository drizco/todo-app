import { API_URL } from '@/constants';
import getAllTodos from '@/fetch/getAllTodos';

describe('getAllTodos', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
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
