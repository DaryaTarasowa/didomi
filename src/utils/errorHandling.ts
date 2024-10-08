import { isRouteErrorResponse } from "react-router-dom";

export function constructErrorMessage(error: unknown): string {
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