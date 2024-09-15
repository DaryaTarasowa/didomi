import React from "react";
import { getConsents } from "../services/consentsAPI.ts";

import {
    GridColDef,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from "@tanstack/react-query"
import PaginatedTable from "../components/PaginatedTable.tsx";
import { constructErrorMessage } from "../utils/errorHandling.ts";
import ErrorScreen from "../components/ErrorScreen.tsx";
import Paginator from "../components/Pagination/MUIPagination.tsx";

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

    const errorOverlay = isError ? <ErrorScreen errorMessage = {constructErrorMessage(error)}/> : undefined;

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "consents", headerName: "Consent given for", width: 400 },
    ]

    return (
        <Paper>
            <PaginatedTable
                columns={columns}
                errorOverlay={errorOverlay}
                itemsPerPage={props.consentsPerPage}
                items={data}
                isLoading={isLoading}
                paginator={Paginator}
            />
        </Paper>
    )
}