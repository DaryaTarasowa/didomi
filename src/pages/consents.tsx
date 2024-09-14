import { getConsents } from "../api/consents.ts";

import {
    GridColDef,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from "@tanstack/react-query"
import PaginatedTable from "../components/PaginatedTable.tsx";
import { constructErrorMessage } from "../utils/errorHandling.ts";


export default function Consents(props: { consentsPerPage: number }) {
    const {
        data,
        isLoading,
        error,
        isError,
        // isLoadingError,
        // refetch
    } = useQuery({
        queryKey: ["consents"],
        queryFn: getConsents,
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
    });

    const errorMessage = isError ? constructErrorMessage(error!) : undefined;

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "consents", headerName: "Consent given for", width: 400 },
    ]

    return (
        <Paper>
            <PaginatedTable columns={columns} errorMessage={errorMessage} itemsPerPage={props.consentsPerPage} items={data} isLoading={isLoading}/>
        </Paper>
    )
}