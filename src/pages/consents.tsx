import { getConsents } from "../api/consents.ts";

import {
    DataGrid,
    GridColDef,
    GridPagination,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from "@tanstack/react-query"
import Paginator from "../components/Paginator.tsx";


export default function ConsentsForm(props: { consentsPerPage: number }) {
    const {
        data,
        isLoading,
        // error,
        // isError,
        // isLoadingError,
        // refetch
    } = useQuery({
        queryKey: ["consents"],
        queryFn: getConsents,
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
    });

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "consents", headerName: "Consent given for", width: 400 },
    ]

    return (
        <Paper>
            <DataGrid
                rows={ data }
                columns={ columns }
                loading={ isLoading }
                pagination
                slots={ { pagination: () => <GridPagination ActionsComponent={ Paginator }/> } }
                slotProps={ {
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                } }
                initialState={ { pagination: { paginationModel: { pageSize: props.consentsPerPage } } } }
                pageSizeOptions={ [props.consentsPerPage] }
                sx={ { border: 0, "& .MuiTablePagination-displayedRows": { display: "none" } } }
                getRowId={ (row) => row.email }
            />
        </Paper>
    )
}