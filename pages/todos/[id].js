import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import useDebounce from '@/hooks/useDebounce';
import useRefreshData from '@/hooks/useRefreshData';
import useError from '@/hooks/useError';
import filterList from '@/utils/filterList';
import FindOrCreateInput from '@/components/FindOrCreateInput';
import TodoItem from '@/components/TodoItem';
import styles from '@/styles/pages/todo-detail.module.scss';
import createItem from '@/fetch/createItem';
import deleteItem from '@/fetch/deleteItem';
import updateItem from '@/fetch/updateItem';
import getTodo from '@/fetch/getTodo';
import getItems from '@/fetch/getItems';

const TodoDetail = ({ todo, id, items = [] }) => {
  const [title, setTitle] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const searchTerm = useDebounce(title, 500);
  const refreshData = useRefreshData();
  const { toastError } = useError();

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
    try {
      await createItem({ id, title });
      setTitle('');
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      setFilteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
      await deleteItem({ todoId: todo.id, itemId: id });
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  const handleCheck = async (e, { id }) => {
    try {
      const { checked } = e.target;
      setFilteredItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, completed: checked } : item))
      );
      await updateItem({ todoId: todo.id, itemId: id, completed: checked });
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  return (
    <div>
      <div className={styles.title_wrapper}>
        <h1>{todo?.title}</h1>
        <Link href="/">
          <a>&#10094; All to-dos</a>
        </Link>
      </div>
      <FindOrCreateInput
        type="item"
        value={title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ul>
        <AnimatePresence>
          {filteredItems.map((item) => (
            <TodoItem
              key={item.id}
              handleDelete={() => handleDelete(item)}
              handleCheck={(e) => handleCheck(e, item)}
              {...item}
            />
          ))}
        </AnimatePresence>
      </ul>
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
  items.reverse();
  return {
    props: {
      todo,
      items,
      id,
    },
  };
};
