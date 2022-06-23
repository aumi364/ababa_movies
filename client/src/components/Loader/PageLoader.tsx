import { ClipLoader } from "react-spinners";
import style from "./Loader.module.css";
import { useEffect, useState } from "react";
const PageLoader = ({ loading, rest }: any) => {
  return (
    <div className={style.pageLoaderStyle}>
      <ClipLoader
        loading={loading}
        speedMultiplier={2}
        color={"#fe2ebb"}
        {...rest}
      />
    </div>
  );
};

export default PageLoader;
