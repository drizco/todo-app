import styles from '@/styles/components/find-or-create-input.module.scss';

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
      <input type="submit" value="➕" />
    </form>
  );
};

export default FindOrCreateInput;
