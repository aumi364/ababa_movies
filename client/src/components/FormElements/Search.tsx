import React from "react";
import toast from "react-hot-toast";
import style from "./FormElements.module.css";
type Props = {
  register: any;
  name: string;
  type: string;
  placeholder?: string;
  required?: any;
  error?: any;
};
const Search = ({
  register,
  name,
  type,
  placeholder,
  required,
  error,
}: Props) => {
  return (
    <div className={style.search}>
      <input
        placeholder={placeholder}
        {...register(name, { required: required && `${name} is required` })}
        type={type}
      />
      {error && <span className={style.error}>{error.message}</span>}
    </div>
  );
};

export default Search;
