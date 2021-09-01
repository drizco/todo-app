import { useEffect, useState } from 'react';
import { getTodo, getItems, createItem } from '@/fetch';
import useDebounce from '@/hooks/useDebounce';
import useRefreshData from '@/hooks/useRefreshData';
import filterList from '@/utils/filterList';
import FindOrCreateInput from '@/components/FindOrCreateInput';

const TodoDetail = ({ todo, id, items = [] }) => {
  const [title, setTitle] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const searchTerm = useDebounce(title, 300);
  const refreshData = useRefreshData();

  useEffect(() => {
    if (searchTerm) {
      setFilteredItems((prevItems) => filterList({ items: prevItems, term: searchTerm }));
    } else {
      setFilteredItems(items);
    }
  }, [searchTerm, items]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem({ id, title });
    setTitle('');
    refreshData();
  };

  return (
    <div>
      <h1>{todo?.title}</h1>
      <FindOrCreateInput
        type="Item"
        value={title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {filteredItems.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default TodoDetail;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const [todo, items] = await Promise.all([getTodo({ id }), getItems({ id })]);
  if (!todo || !items) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      todo,
      items,
      id,
    },
  };
};
