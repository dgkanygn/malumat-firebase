export const TextArea = ({ onChange, value, name, placeholder }) => {
  return (
    <>
      <textarea
        className="bg-slate-100 p-2 outline-none rounded "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        rows="5"
      />
    </>
  );
};
