import { API_URL } from '@/constants';
import getItems from '@/fetch/getItems';

describe('getItems', () => {
  let id;
  beforeEach(() => {
    fetch.resetMocks();
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
