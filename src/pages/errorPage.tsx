import { useRouteError } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen.tsx";
import { constructErrorMessage } from "../utils/errorHandling.ts";

export default function ErrorPage() {
    const errorMessage = constructErrorMessage(useRouteError());

    return (
        <ErrorScreen errorMessage={errorMessage}/>
    );
}