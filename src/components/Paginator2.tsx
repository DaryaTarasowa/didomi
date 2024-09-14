import { useEffect, useState } from "react";
import { Box } from "@mui/material";

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

interface IPagination {
    pageCount: number,
    currentPage: number,

    onChange(event: any, newPage: number): void,
}

function Pagination(props: IPagination) {
    const { currentPage, pageCount, onChange } = props;
    const pages = Array.from(Array(pageCount).keys());

    const renderPageLink = (pageNumber: number) => {
        return <div><button>{pageNumber}</button></div>
    }
    return (
        <Box sx={{ justifyContent: 'space-between' }}>
            <b onClick={ (e) => onChange(e, currentPage - 1) }>Prev</b>
            {
               pages.map(renderPageLink)
            }
            <b onClick={ (e) => onChange(e, currentPage + 1) }>Next</b>
        </Box>
    );
};

export default Pagination;