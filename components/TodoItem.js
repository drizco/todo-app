import Card from '@/components/Card';
import styles from '@/styles/components/todo-item.module.scss';
import CheckBox from '@/components/CheckBox';
import { TrashIcon } from '@/components/Icons';

const TodoItem = ({ title, completed, handleDelete, handleCheck }) => {
  return (
    <Card>
      <div data-testid="todo-item" className={styles.todo_item}>
        <div className={styles.title}>{title}</div>
        <div className={styles.checkbox_container}>
          <CheckBox
            type="checkbox"
            name={title}
            checked={completed}
            onChange={handleCheck}
          />
        </div>
        <button onClick={handleDelete}>
          <TrashIcon />
        </button>
      </div>
    </Card>
  );
};

export default TodoItem;
