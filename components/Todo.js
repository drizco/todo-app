import Link from 'next/link';
import Card from '@/components/Card';
import styles from '@/styles/components/todo.module.scss';

const Todo = ({ title, id, handleDelete }) => {
  return (
    <Card>
      <div className={styles.todo}>
        <Link href={`/todos/${id}`}>
          <a>{title}</a>
        </Link>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </Card>
  );
};

export default Todo;
