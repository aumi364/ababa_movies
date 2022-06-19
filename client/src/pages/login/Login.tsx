import React from "react";
import style from "./Login.module.css";
import LoginContainer from "./LoginContainer";
type Props = {};

const Login = (props: Props) => {
  return (
    <div className={style.logIn}>
      <LoginContainer />
    </div>
  );
};

export default Login;
