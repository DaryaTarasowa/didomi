import { PaginationItem, TablePaginationProps } from "@mui/material";
import { gridPageCountSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";

function Pagination({
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
                onPageChange(event as any, newPage - 1);
            }}
            renderItem={(item) => (
                <PaginationItem
                    slots={{
                        next: () => showPagination ? "Next page >>" : null,
                        previous: () => showPagination ? "<< Previous page" : null,
                    }}
                    {...item}
                />
            )}
        />
    );
}

export default Pagination