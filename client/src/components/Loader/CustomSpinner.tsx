import { ClipLoader } from "react-spinners";
const CustomSpinner = (props: any) => {
  return (
    <div>
      <ClipLoader color={"#fe2ebb"} {...props} />
    </div>
  );
};

export default CustomSpinner;
