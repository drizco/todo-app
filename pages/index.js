import { useEffect, useState } from 'react';
import { createTodo, getAllTodos } from '@/fetch';
import Todo from '@/components/Todo';
import FindOrCreateInput from '@/components/FindOrCreateInput';
import useDebounce from '@/hooks/useDebounce';
import filterList from '@/utils/filterList';
import useRefreshData from '@/hooks/useRefreshData';

const Todos = ({ todos = [] }) => {
  const [title, setTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const searchTerm = useDebounce(title, 300);
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

  return (
    <div>
      <FindOrCreateInput
        type="Todo"
        value={title}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {filteredTodos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
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
  return {
    props: {
      todos,
    },
  };
};
