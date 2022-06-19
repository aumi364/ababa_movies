import React from "react";

import style from "./Login.module.css";
import LoginForm from "./LoginForm";

const LoginContainer: React.FC = (props) => {
  return (
    <div className={style.loginContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginContainer;
