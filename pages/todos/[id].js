import ItemGenerator from '@/components/ItemGenerator';
import { getTodo, getItems } from '@/fetch';

const TodoDetail = ({ todo, id, items }) => {
  return (
    <div>
      <h1>{todo?.title}</h1>
      <ItemGenerator id={id} />
    </div>
  );
};

export default TodoDetail;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const [todo, items] = await Promise.all([getTodo({ id }), getItems({ id })]);
  return {
    props: {
      todo,
      items,
      id,
    },
  };
};
