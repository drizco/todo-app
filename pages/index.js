import TodoGenerator from '@/components/TodoGenerator';
import Todo from '@/components/Todo';
import { getAllTodos } from '@/fetch';

const Todos = ({ todos = [] }) => {
  return (
    <div>
      <TodoGenerator />
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default Todos;

export const getServerSideProps = async () => {
  const todos = await getAllTodos();
  return {
    props: {
      todos,
    },
  };
};
