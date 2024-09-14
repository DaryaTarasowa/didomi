import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function constructErrorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${ error.status } ${ error.statusText }`
    } else if (error != undefined && error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else {
        console.error(error);
        return 'Unknown error';
    }
}

export default function ErrorPage() {
    const errorMessage = constructErrorMessage(useRouteError());

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{ errorMessage }</i>
            </p>
        </div>
    );
}