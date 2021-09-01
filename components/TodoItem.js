import Card from '@/components/Card';
import styles from '@/styles/components/todo-item.module.scss';

const TodoItem = ({ title, id, handleDelete }) => {
  return (
    <Card>
      <div className={styles.todo_item}>
        <div className={styles.title}>{title}</div>
        <button onClick={handleDelete}>🗑️</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </Card>
  );
};

export default TodoItem;
