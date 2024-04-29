import React from "react";

export const Input = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  maxLength,
}) => {
  return (
    <>
      <input
        className="rounded bg-slate-100 p-2 outline-none "
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </>
  );
};
