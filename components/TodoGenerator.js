import { createTodo } from '@/fetch';
import { useState } from 'react';

const TodoGenerator = () => {
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodo({ title });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={title} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TodoGenerator;
