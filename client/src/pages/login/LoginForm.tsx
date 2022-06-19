import React from "react";
import Input from "../../components/FormElements/Input";
import formStyle from "../../components/FormElements/FormElements.module.css";
import Button from "../../components/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
type Props = {};

type Form = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (data) => console.log(data);
  console.log(errors);
  return (
    <form className={formStyle.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default LoginForm;
