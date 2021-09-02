import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import filterList from '@/utils/filterList';
import useDebounce from '@/hooks/useDebounce';
import useRefreshData from '@/hooks/useRefreshData';
import useError from '@/hooks/useError';
import Todo from '@/components/Todo';
import FindOrCreateInput from '@/components/FindOrCreateInput';
import styles from '@/styles/pages/todos.module.scss';
import createTodo from '@/fetch/createTodo';
import deleteTodo from '@/fetch/deleteTodo';
import getAllTodos from '@/fetch/getAllTodos';

const Todos = ({ todos = [] }) => {
  const [title, setTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const searchTerm = useDebounce(title, 500);
  const refreshData = useRefreshData();
  const { toastError } = useError();

  useEffect(() => {
    if (searchTerm) {
      setFilteredTodos((prevTodos) => filterList({ items: prevTodos, term: searchTerm }));
    } else {
      setFilteredTodos(todos);
    }
  }, [searchTerm, todos]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title });
      setTitle('');
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      setFilteredTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await deleteTodo({ id });
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  return (
    <>
      <div className={styles.spacer} />
      <FindOrCreateInput
        type="to-do"
        value={title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ul>
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <Todo key={todo.id} handleDelete={() => handleDelete(todo)} {...todo} />
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};

export default Todos;

export const getServerSideProps = async () => {
  const todos = await getAllTodos();
  if (!todos) {
    return {
      notFound: true,
    };
  }
  todos.reverse();
  return {
    props: {
      todos,
    },
  };
};
