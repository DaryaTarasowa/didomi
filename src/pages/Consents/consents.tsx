import React from "react";
import { getConsents } from "../../services/consentsAPI.ts";

import {
    GridColDef,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from "@tanstack/react-query"
import DidomiDataGrid from "../../components/DataGrid/DidomiDataGrid.tsx";
import { constructErrorMessage } from "../../utils/errorHandling.ts";
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen.tsx";
import DidomiPagination from "../../components/Pagination/DidomiPagination.tsx";
import { transformConsentsForUI } from "../../utils/consentChoiceTransformer.ts";
import { IConsent } from "../../interfaces/consentTypes.ts";
import "./consents.css";

export default function Consents(props: { consentsPerPage: number }) {
    const {
        data,
        isLoading,
        error,
        isError,
        isLoadingError,
        // refetch
    } = useQuery({
        queryKey: ["consents"],
        queryFn: getConsents,
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
    });

    const rows: IConsent[] = [];

    if (data) {
        rows.push(...transformConsentsForUI(data));

        console.log(rows);
    }

    const errorOverlay = (isError || isLoadingError) ?
        <ErrorScreen errorMessage={ constructErrorMessage(error) }/> : undefined;

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", headerClassName: "consents-datagridColumnHeader", width: 150 },
        { field: "email", headerName: "Email", headerClassName: "consents-datagridColumnHeader", width: 300 },
        { field: "consentOptionsString", headerName: "Consent given for", headerClassName: "consents-datagridColumnHeader", width: 600 },
    ]

    return (
        <Paper>
            <DidomiDataGrid
                columns={ columns }
                customErrorOverlay={ errorOverlay }
                itemsPerPage={ props.consentsPerPage }
                items={ rows }
                isLoading={ isLoading }
                paginator={ DidomiPagination }
            />
        </Paper>
    )
}