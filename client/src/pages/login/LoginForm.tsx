import React from "react";
import Input from "../../components/FormElements/Input";
import formStyle from "../../components/FormElements/FormElements.module.css";
import Button from "../../components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { loginReq } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Navigate } from "react-router-dom";
type Props = {};

type Form = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const dispatch = useDispatch<AppDispatch>();
  const { isSuccess } = useSelector((state: any) => state.auth);

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
    dispatch(loginReq({ formData: data, url: "/auth/login" }));
  };

  return (
    <>
      {isSuccess ? (
        <Navigate to="home" />
      ) : (
        <form
          className={formStyle.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            name="email"
            type="email"
            placeholder="Email"
            required
            error={errors.email}
          />
          <Input
            register={register}
            name="password"
            type="password"
            placeholder="Password"
            required
            error={errors.password}
          />
          <Button type="submit">Submit</Button>
          {/* {console.log(errors)} */}
        </form>
      )}
    </>
  );
};

export default LoginForm;
