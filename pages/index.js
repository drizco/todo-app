import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createTodo, deleteTodo, getAllTodos } from '@/fetch';
import filterList from '@/utils/filterList';
import useDebounce from '@/hooks/useDebounce';
import useRefreshData from '@/hooks/useRefreshData';
import Todo from '@/components/Todo';
import FindOrCreateInput from '@/components/FindOrCreateInput';

const Todos = ({ todos = [] }) => {
  const [title, setTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const searchTerm = useDebounce(title, 500);
  const refreshData = useRefreshData();

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
    await createTodo({ title });
    setTitle('');
    refreshData();
  };

  const handleDelete = async ({ id }) => {
    await deleteTodo({ id });
    refreshData();
  };

  return (
    <>
      <FindOrCreateInput
        type="Todo"
        value={title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <AnimatePresence>
        <ul>
          {filteredTodos.map((todo) => (
            <Todo key={todo.id} handleDelete={() => handleDelete(todo)} {...todo} />
          ))}
        </ul>
      </AnimatePresence>
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
