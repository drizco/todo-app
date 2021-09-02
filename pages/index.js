import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createTodo, deleteTodo, getAllTodos } from '@/fetch';
import filterList from '@/utils/filterList';
import useDebounce from '@/hooks/useDebounce';
import useRefreshData from '@/hooks/useRefreshData';
import useError from '@/hooks/useError';
import Todo from '@/components/Todo';
import FindOrCreateInput from '@/components/FindOrCreateInput';

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

  const handleDelete = async (todo) => {
    try {
      const { id } = todo;
      setFilteredTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
      await deleteTodo({ id });
    } catch (error) {
      toastError();
    } finally {
      refreshData();
    }
  };

  return (
    <>
      <FindOrCreateInput
        type="Todo"
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
