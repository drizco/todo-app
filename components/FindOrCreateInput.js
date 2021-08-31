const FindOrCreateInput = ({ value, onChange, onSubmit, type }) => {
  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder={`Search or Create new ${type}`}
        value={value}
        onChange={onChange}
      />
      <input type="submit" value="CREATE" />
    </form>
  );
};

export default FindOrCreateInput;
