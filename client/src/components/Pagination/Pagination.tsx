import React from "react";
import PaginationStyle from "./PaginationStyle.module.css";

type Props = {
  offset: number;
  count: number;
  pageLimit: number;
  handlePageChange: (page: number) => void;
};

const Pagination = ({ offset, pageLimit, handlePageChange, count }: Props) => {
  const before = () => {
    if (offset > 1) {
      handlePageChange(offset - 1);
    }
  };
  const after = () => {
    if (offset * pageLimit < count) {
      handlePageChange(offset + 1);
    }
  };
  return (
    <div className={PaginationStyle.pagination}>
      <div className={PaginationStyle.paginationIcon} onClick={before}>
        <p>{"Previous"}</p>
      </div>
      <div className={PaginationStyle.paginationIcon} onClick={after}>
        <p>{"Next"}</p>
      </div>
    </div>
  );
};

export default Pagination;
