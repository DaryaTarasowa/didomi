import React from "react";

import { TablePaginationProps, TablePagination } from "@mui/material";
import {
    gridPageSizeSelector,
    gridPaginationRowCountSelector,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";

export default function DidomiTablePagination({
                                    page,
                                    onPageChange,
                                    className,
                                }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const rowsCount = useGridSelector(apiRef, gridPaginationRowCountSelector);
    const rowsPerPage = useGridSelector(apiRef, gridPageSizeSelector);
    return <TablePagination
        className={className}
        component="div"
        count={rowsCount}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2]}
    />
}