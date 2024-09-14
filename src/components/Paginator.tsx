import {useEffect, useState} from "react";

function usePagination<T>(items: T[], pageLimit: number) {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = Math.ceil(items.length / pageLimit);

  const setPage = (pN: number) => {
    setPageNumber(pN);
  };

  const getPageItems = () => {
    const s = pageNumber * pageLimit;
    const e = s + pageLimit;
    return items.slice(s, e);
  };

  const setPageNext = () => {
    setPageNumber(Math.min(pageNumber + 1, pageCount - 1));
  };

  const setPagePrevious = () => {
    setPageNumber(Math.max(pageNumber - 1, 0));
  };

  return {
    pageNumber,
    pageCount,
    getPageItems,
    setPage,
    setPageNext,
    setPagePrevious,
  };
}

interface IPagination<T> {
  items: T[],
  setPageItems(pageData: () => T[]): void,
  itemsPerPage: number,
}

function Pagination<T>(props: IPagination<T>) {
  const {items, itemsPerPage, setPageItems} = props;
  const { pageNumber, setPage, getPageItems, setPageNext, setPagePrevious } =
    usePagination(items, itemsPerPage);

  useEffect(() => {
    setPageItems(getPageItems);
  }, [pageNumber]);

  return (
    <div>
      <b onClick={setPagePrevious}>Prev</b>
      <input
        value={pageNumber}
        onChange={(e) => {
          setPage(e.target.valueAsNumber);
        }}
        type="number"
      />
      <b onClick={setPageNext}>Next</b>
    </div>
  );
};

export default Pagination;