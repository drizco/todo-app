import Link from 'next/link';

const Todo = ({ title, id }) => {
  return (
    <div>
      <Link href={`/todos/${id}`}>
        <a>{title}</a>
      </Link>
    </div>
  );
};

export default Todo;
