import React from "react";
import style from "./Button.module.css";
type Props = {
  children: any;
  type?: any;
};

const Button = ({ children, type }: Props) => {
  return (
    <button className={style.Button} type={type}>
      {children}
    </button>
  );
};

export default Button;
