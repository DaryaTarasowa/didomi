import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import Paginator from "./Pagination.tsx";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

interface IPaginatedTable<T> {
    columns: GridColDef[],
    itemsPerPage: number,
    items: T[],
    isLoading: boolean,
    errorMessage?: string
}

export default function PaginatedTable<T>(props: IPaginatedTable<T>) {
    const CustomNoRowsOverlay = () => {
        const textToShow = props.errorMessage || "No Rows";
        return (
            <Box>{ textToShow }</Box>
        );
    }
    const CustomPagination = () => {
        return <GridPagination
            ActionsComponent={ Paginator }
            labelDisplayedRows={ () => {
                return null
            } }
        />
    }
    return (
        <Paper>
            <DataGrid
                rows={ props.items }
                columns={ props.columns }
                loading={ props.isLoading }
                pagination
                slots={ {
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                } }
                slotProps={ {
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                } }
                initialState={ { pagination: { paginationModel: { pageSize: props.itemsPerPage } } } }
                pageSizeOptions={ [props.itemsPerPage] }
                sx={ { border: 0 } }
                getRowId={ (row) => row.email }
            />
        </Paper>
    )
}