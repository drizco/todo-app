import { createItem } from '@/fetch';
import { useState } from 'react';

const ItemGenerator = ({ id }) => {
  const [title, setTitle] = useState('');
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem({ id, title });
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

export default ItemGenerator;
