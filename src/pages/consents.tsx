import { getConsents } from "../api/consents.ts";
import Pagination from "../components/Paginator.tsx";

import {
    useQuery,
} from "@tanstack/react-query"
import { useState } from "react";
import { IConsent } from "../types/consentTypes.ts";


export default function Consent() {
    const {
        data,
        isLoading,
        // error,
        // isError,
        // isLoadingError,
        // refetchå
    } = useQuery({
        queryKey: ["consents"],
        queryFn: getConsents,
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
    });

    const itemsPerPage = 2;
    const [pageConsents, setPageConsents] = useState([]);

    const emails = data?.map((item: IConsent) => item.email);

    if (isLoading)
        return <div>Loading...</div>;

    return (
        <>
            <div>
                { pageConsents.map((consent) => (<div>{ consent }</div>)) }
            </div>
            <Pagination items={ emails } setPageItems={ setPageConsents } itemsPerPage={ itemsPerPage }/>
        </>

    )
}