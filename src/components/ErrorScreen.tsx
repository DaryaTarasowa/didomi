import React from "react";
import { FC, ReactElement } from "react";

const ErrorScreen: FC<{errorMessage: string}> = (props: {errorMessage: string}): ReactElement | null => {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{ props.errorMessage }</i>
            </p>
        </div>
    )
}

export default ErrorScreen

