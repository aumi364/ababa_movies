import { useState } from "react";

const usePagination = () => {
  const [pageLimit, setPageLimit] = useState(10);
  const [offset, setOffset] = useState(1);

  const handlePageChange = (newOffset: any) => {
    setOffset(newOffset);
  };
  const resetPagination = () => {
    setPageLimit(10);
    setOffset(0);
  };
  return { pageLimit, offset, handlePageChange, resetPagination };
};

export default usePagination;
