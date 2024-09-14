import { getConsents } from "../api/consents.ts";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from "@tanstack/react-query"

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
                initialState={ { pagination: { paginationModel: {pageSize: props.consentsPerPage} } } }
                pageSizeOptions={[props.consentsPerPage]}
                sx={ { border: 0 } }
                getRowId={ (row) => row.email }
            />
        </Paper>

    )
}