import styles from '@/styles/components/find-or-create-input.module.scss';
import { PlusIcon } from './Icons';

const FindOrCreateInput = ({ value, onChange, onSubmit, type }) => {
  return (
    <form autoComplete="off" onSubmit={onSubmit} className={styles.input_container}>
      <input
        type="text"
        name="title"
        placeholder={`Find or Create a new ${type}`}
        value={value}
        onChange={onChange}
      />
      <button type="submit" disabled={!value}>
        <PlusIcon />
      </button>
    </form>
  );
};

export default FindOrCreateInput;
