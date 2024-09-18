import React from "react";
import { Pagination as MuiPagination, PaginationItem, TablePaginationProps, Typography } from "@mui/material";
import {
    gridPageCountSelector,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";


export default function DidomiPagination({
                        page,
                        onPageChange,
                        className,
                    }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const showPagination = pageCount > 1;
    return (
        <MuiPagination
            color="primary"
            className={className}
            count={pageCount}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as never, newPage - 1);
            }}
            renderItem={(item) => (
                <PaginationItem
                    slots={{
                        next: () => showPagination ? <Typography color="textPrimary">{"Next page >>"}</Typography>: null,
                        previous: () => showPagination ? <Typography color="textPrimary">{"<< Previous page"}</Typography> : null,
                    }}
                    {...item}
                />
            )}
        />
    );
}