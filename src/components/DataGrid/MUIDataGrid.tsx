import React, { ReactElement } from "react";
import {
    DataGrid,
    GridColDef,
    GridNoRowsOverlay,
    GridPagination,
} from "@mui/x-data-grid";
import Paginator from "../Pagination/MUIPagination.tsx";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";

interface IPaginatedTable<T> {
    columns: GridColDef[],
    itemsPerPage: number,
    items: T[],
    isLoading: boolean,
    errorOverlay?: ReactElement,
    paginator?:  React.ElementType<TablePaginationActionsProps, keyof React.JSX.IntrinsicElements> | undefined
}

export default function MUIDataGrid<T>(props: IPaginatedTable<T>) {
    const errorOverlay = props.errorOverlay ?? <GridNoRowsOverlay/>;
    const CustomNoRowsOverlay = () => {
        return (
            <>{ errorOverlay }</>
        );
    }
    const CustomPagination = () => {
        return <GridPagination
            ActionsComponent={ props.paginator || Paginator}
            labelDisplayedRows={ () => {
                return null
            } }
        />
    }
    return (
        <DataGrid
            autoHeight
            disableRowSelectionOnClick
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
            initialState={ {
                pagination:
                    { paginationModel: { pageSize: props.itemsPerPage } },
            } }
            pageSizeOptions={ [props.itemsPerPage] }
            sx={ { border: 0 } }
            getRowId={ (row) => row.email }
        />
    )
}