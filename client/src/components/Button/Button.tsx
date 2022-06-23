import CustomSpinner from "./../Loader/CustomSpinner";
import style from "./Button.module.css";
type Props = {
  children: any;
  type?: any;
  loading: boolean;
};

const Button = ({ children, type, loading }: Props) => {
  return (
    <button className={style.Button} type={type}>
      {loading ? <CustomSpinner size={10} /> : children}
    </button>
  );
};

export default Button;
